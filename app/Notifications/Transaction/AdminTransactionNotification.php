<?php

namespace App\Notifications\Transaction;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AdminTransactionNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(protected string $status, protected $user)
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
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            
            ->line("Une transaction vient d'être achevée")
            ->action('Voir les détails', url(env('FRONTEND_URL') . "/admin/dashboard"))
            ->line('Etat de la transaction: ' . $this->status)
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
