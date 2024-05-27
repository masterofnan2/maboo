<?php

namespace App\Notifications\Transaction;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CustomerTransactionNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(protected string $order_id, protected string $status)
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
        switch ($this->status) {
            case TRANSACTION_STATUS_SUCCESS:
                return (new MailMessage)
                    ->line('Commande confirmée')
                    ->action('voir la commande', url(env('FRONTEND_URL') . "/order/{$this->order_id}"))
                    ->line('Nous vous remercions pour votre confiance!')
                    ->success();

            default:
                return (new MailMessage)
                    ->line('Paiement echoué!')
                    ->action('voir la commande', url(env('FRONTEND_URL') . "/order/{$this->order_id}"))
                    ->line("Votre commande n'a pas été confirmée en raison de l'échec du paiement.")
                    ->error();
        }
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
