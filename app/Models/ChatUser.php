<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatUser extends Model
{
    use HasFactory;

    protected function chat_ids(): array
    {
        $chatUsers = $this->chats()->get()->toArray();

        if (count($chatUsers) > 0) {
            return array_map(fn($chatUser) => $chatUser['chat_id'], $chatUsers);
        }

        return [];
    }

    public function chatUsers()
    {
        $chatUsers = $this->where("user_id", auth()->id());
        return $chatUsers;
    }

    public function getChat(int $other_user_id)
    {
        $chat = $this->whereIn('chat_id', $this->chat_ids())->where('user_id', $other_user_id)->get();
        return $chat;
    }

    public function users(){
        return $this->hasMany(User::class);
    }

    public function chat()
    {
        
    }
}