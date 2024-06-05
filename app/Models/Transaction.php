<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    public static $TRANSACTION_TYPE_ORDER = 'ORDER';
    public static $TRANSACTION_TYPE_SUBSCRIPTION = 'SUBSCRIPTION';

    protected $fillable = [
        'description',
        'transactionnable_id',
        'status',
        'method',
        'user_id',
    ];
}
