<?php

namespace App\Http\Controllers;

use App\Models\SoldItem;
use Illuminate\Http\Request;

class SoldItemController extends Controller
{
    public function pending()
    {
        $soldItems = SoldItem::statusPending()->get();
        return response()->json(['items' => $soldItems]);
    }
}
