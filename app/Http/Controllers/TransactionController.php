<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Providers\Actions\OrderActions;
use App\Providers\Actions\Transaction\OrangeMoneyActions;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function makeOrder(Request $request, OrderActions $orderActions)
    {
        $transactionData = $response = [];

        $order_id = $request->order_id;
        $method = $request->method;

        $order = $orderActions->getOrder($order_id);

        $transactionData['transactionnable_id'] = $order_id;
        $transactionData['method'] = $method;
        $transactionData['user_id'] = $order->user_id;

        switch ($method) {
            case 'ORANGEMONEY':
                $details = (new OrangeMoneyActions)
                    ->setAmount($order->total_price)
                    ->setOrderId($order_id)
                    ->initTransaction();

                $notificationToken = $details->notif_token;
                $paymentToken = $details->pay_token;

                $transactionData['description'] = json_encode([
                    'notif_token' => $notificationToken,
                    'payment_token' => $paymentToken,
                ]);

                $response['payment_url'] = $details->payment_url;
                break;

            default:
                # code...
                break;
        }

        $transaction = Transaction::create($transactionData);
        $order->update([
            'transaction_id' => $transaction->id
        ]);

        return response()->json($response);
    }

    public function orangeMoneyStatus(string $transactionnable_id, Request $request)
    {
        $transaction = Transaction::where('transactionnable_id', $transactionnable_id)->first();
        $description = json_decode($transaction?->description);
        
        file_put_contents('transaction_logs.tsx', [
            'transactionnable_id' => $transactionnable_id,
            'transaction' => $transaction,
            'request' => $request->all(),
        ]);

        if ($description?->notif_token !== $request->notif_token) {
            abort(403);
        }

        $transaction->update([
            'status' => $request->status
        ]);
    }
}