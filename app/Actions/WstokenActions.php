<?php

namespace App\Actions;

use App\Models\Wstoken;
use Str;

class WstokenActions
{
    private function createToken(): Wstoken
    {
        $token = Wstoken::create([
            'user_id' => auth()->id(),
            'uuid' => Str::random(),
        ]);

        return $token;
    }

    public function getToken(): WsToken
    {
        $token = Wstoken::where('user_id', auth()->id())->latest()->first();

        if (!$token) {
            $token = $this->createToken();
        }

        return $token;
    }
}