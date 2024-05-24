<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function small(string $query)
    {
        $keywords = "%{$query}%";
        $results = [];

        if ($keywords) {
            $results['products'] = Product::where('title', 'like', $keywords)
                ->orWhere('description', 'like', $keywords)
                ->limit(2)
                ->get();

            $results['sellers'] = User::where('type', SELLER)
                ->where('name', 'like', $keywords)
                ->orWhere('firstname', 'like', $keywords)
                ->limit(2)
                ->get();
        }

        return response()->json($results);
    }
}
