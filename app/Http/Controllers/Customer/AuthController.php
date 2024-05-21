<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\LoginRequest;
use App\Http\Requests\Customer\SignupRequest;
use App\Providers\Actions\AuthActions;
use Illuminate\Http\Request;


class AuthController extends Controller
{
    public function getAuth(AuthActions $authActions)
    {
        return $authActions->getAuth(CUSTOMER);
    }

    public function login(LoginRequest $request, AuthActions $authActions)
    {
        return $authActions->login($request);
    }

    public function signup(SignupRequest $request, AuthActions $authActions)
    {
        return $authActions->signup($request, CUSTOMER);
    }

    public function resetPassword(Request $request, AuthActions $authActions)
    {
        return $authActions->resetPassword($request, CUSTOMER);
    }
}