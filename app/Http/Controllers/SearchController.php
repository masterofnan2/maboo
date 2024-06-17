<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;


class SearchController extends Controller
{
    const TYPES = [
        'products',
        'sellers',
    ];

    protected string $keywords;
    protected Request $request;

    protected function searchByType(string $type): Collection
    {
        $limit = $this->request->limit ?: 2;
        $offset = $this->request->offset ?: 0;
        $Model = null;

        switch ($type) {
            case ('products'):
                $Model = Product::where('title', 'like', $this->keywords)
                    ->orWhere('description', 'like', $this->keywords);
                break;

            case ('sellers'):
                $Model = User::where('type', SELLER)
                    ->where('name', 'like', $this->keywords)
                    ->orWhere('firstname', 'like', $this->keywords);

                break;

            default:
                break;
        }

        $result = $Model
            ->limit($limit)
            ->offset($offset)
            ->get();

        return $result;
    }

    public function search(string $query, Request $request)
    {
        $results = [];
        $this->keywords = "%$query%";
        $this->request = $request;

        if ($request->type) {
            $results[$request->type] = $this->searchByType($request->type);
        } else {
            foreach (self::TYPES as $type) {
                $results[$type] = $this->searchByType($type);
            }
        }

        return response()->json($results);
    }
}
