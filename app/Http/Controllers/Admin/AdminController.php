<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function requests()
    {
        $admins = User::where('type', ADMIN)
            ->where('validated_at', '=', null)
            ->get();

        return response()->json(['admins' => $admins]);
    }
}
