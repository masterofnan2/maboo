<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\HttpException;

class Helpers
{

    public static function getIsoString(\DateTime $datetime): string
    {
        return $datetime->format('Y-m-d H:i:s');
    }

    public static function capitalizeWords(string $words)
    {
        $arrayOfWords = explode(' ', $words);
        $capitalized = implode(' ', array_map(fn($value) => ucfirst($value), $arrayOfWords));

        return $capitalized;
    }

    public static function deleteImage(string $image)
    {

        $deleted = false;
        $imagePath = "public/{$image}";

        if (Storage::exists($imagePath)) {
            $deleted = Storage::delete($imagePath);
        }

        return $deleted;
    }

    public static function getValuesOf(string $key, Collection $entries)
    {
        return $entries->map(function ($entry) use ($key) {
            return $entry->$key;
        })->toArray();
    }

    public static function debugVar($variable)
    {
        throw new HttpException(300, json_encode(['variable' => $variable]));
    }
}