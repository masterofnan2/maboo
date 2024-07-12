<?php

namespace App\Http\Controllers;


use App\Models\Notification;
use Illuminate\Http\JsonResponse;

class NotificationController extends Controller
{
    public function unreadList(): JsonResponse
    {
        $notifications = Notification::unread()->get();
        return response()->json(['notifications' => $notifications]);
    }

    public function all(): JsonResponse
    {
        $notifications = Notification::all();
        return response()->json(['notifications' => $notifications]);
    }

    public function read(string $notification_id)
    {
        $user = auth()->user();
        $notification = $user->notifications()->find($notification_id);

        if ($notification)
            $notification->markAsRead();
    }
}
