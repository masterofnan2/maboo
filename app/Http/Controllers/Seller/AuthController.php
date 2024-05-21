<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Requests\Seller\LoginRequest;
use App\Http\Requests\Seller\SignupRequest;
use App\Notifications\User\RequestAccountValidation;
use App\Providers\Actions\AuthActions;
use App\Providers\Actions\UserActions;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function getAuth(AuthActions $authActions)
    {
        return $authActions->getAuth(SELLER);
    }

    public function login(LoginRequest $request, AuthActions $authActions)
    {
        return $authActions->login($request);
    }

    public function signup(SignupRequest $request, AuthActions $authActions, UserActions $userActions)
    {
        $response = $authActions->signup($request, SELLER);
        $userActions->notifyAdmins(new RequestAccountValidation());

        return $response;
    }

    public function resetPassword(Request $request, AuthActions $authActions)
    {
        return $authActions->resetPassword($request, ADMIN);
    }
}