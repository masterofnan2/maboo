<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Requests\Seller\LoginRequest;
use App\Http\Requests\Seller\SignupRequest;
use App\Models\User;
use App\Notifications\User\RequestAccountValidation;
use App\Actions\AuthActions;
use App\Actions\UserActions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function getAuth(AuthActions $authActions)
    {
        return $authActions->getAuth(User::TYPE_SELLER);
    }

    public function login(LoginRequest $request, AuthActions $authActions)
    {
        return $authActions->login($request);
    }

    public function signup(SignupRequest $request, AuthActions $authActions, UserActions $userActions)
    {
        $response = $authActions->signup($request, User::TYPE_SELLER);
        $userActions->notifyAdmins(new RequestAccountValidation(Auth::user()));

        return $response;
    }

    public function resetPassword(Request $request, AuthActions $authActions)
    {
        return $authActions->resetPassword($request, User::TYPE_ADMIN);
    }
}