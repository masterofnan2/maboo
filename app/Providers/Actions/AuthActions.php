<?php

namespace App\Providers\Actions;

use App\Models\User;
use App\Providers\Actions\Mail\PasswordResetActions;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthActions extends Actions
{
    public function validateEmail(string $email): bool
    {
        // $CERTIFICATE = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'certificates' . DIRECTORY_SEPARATOR . 'check-email.crt';
        $isValid = false;

        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => "https://emailvalidation.abstractapi.com/v1/?api_key=b899e76d986f4f18a7f4da21dd59aae7&email={$email}",
            CURLOPT_SSL_VERIFYPEER => false,
            // CURLOPT_CAINFO => $CERTIFICATE,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => [
                "X-RapidAPI-Host: email-checker.p.rapidapi.com",
                "X-RapidAPI-Key: b7e1071b14msh1e80bc49461b677p1296a4jsn88863fa29281"
            ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            throw ValidationException::withMessages(['email' => 'Failed to verify email.']);
        }

        $response = json_decode($response);

        if (isset($response->deliverability) && $response->deliverability === 'DELIVERABLE') {
            $isValid = true;
        }

        return $isValid;
    }

    public function getAuth(string $userType)
    {
        $userActions = new UserActions;
        $user = $userActions->user();

        if ($user->type === $userType) {
            return response()->json(['user' => $user]);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function login($request): JsonResponse
    {
        $tokenActions = new TokenActions;
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ["Adresse email ou mot de passe incorrect."],
            ]);
        }

        return response()->json([
            'token' => $tokenActions->setUser($user)->createToken(),
            'user' => $user
        ]);
    }

    public function signup($request, string $userType): JsonResponse
    {
        $tokenActions = new TokenActions;
        $userData = $request->validated();

        $userData['password'] = Hash::make($userData['password']);
        $userData['type'] = $userType;

        $user = User::create($userData);
        $auth = User::find($user->id);

        Auth::login($auth);

        return response()->json([
            'token' => $tokenActions->setUser($user)->createToken(),
            'user' => $auth
        ]);
    }

    public function resetPassword($request, string $userType): JsonResponse
    {
        $passwordResetActions = new PasswordResetActions;
        $tokenActions = new TokenActions;

        $request->validate([
            'token' => 'exists:password_reset_tokens',
            'password' => 'required|min:6|max:40|confirmed',
        ]);

        $token = $request->input('token');
        $newPassword = $request->input('password');

        $user = $passwordResetActions
            ->setToken($token);

        $user = $passwordResetActions->getUser();

        if ($user->type !== $userType) {
            return response()->json([
                'errors' => [
                    'token' => 'Token is invalid'
                ]
            ], 403);
        }

        $passwordResetActions
            ->setNewPassword($newPassword)
            ->reset();

        return response()->json([
            'user' => $user,
            'token' => $tokenActions
                ->setUser($user)
                ->createToken()
        ]);
    }
}