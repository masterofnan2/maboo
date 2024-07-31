<?php

namespace App\Notifications\User;

use App\Models\User;
use Illuminate\Auth\Authenticatable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RequestAccountValidation extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(protected User|Authenticatable $user)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject("Vous avez une nouvelle demande d'inscription.")
            ->action('Ouvrir le Dashboard', url(env('FRONTEND_URL') . "/admin/dashboard/admins/requests"))
            ->lines([
                "Nom de l'utilisateur: {$this->user->name}",
                "Prénom(s) de l'utilisateur: {$this->user->firstname}",
                "Email de l'utilisateur: {$this->user->email}",
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
