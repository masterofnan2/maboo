<?php

namespace App\Providers\Helpers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;

class Helpers
{
    public static function capitalize(string $string)
    {
        $firstLetter = substr($string, 0, 1);

        $rest = substr($string, 1);
        $capitalizedFirstLetter = strtoupper($firstLetter);

        return $capitalizedFirstLetter . strtolower($rest);
    }

    public static function getIsoString(\DateTime $datetime): string
    {
        return $datetime->format('Y-m-d H:i:s');
    }

    public static function capitalizeWords(string $words)
    {
        $arrayOfWords = explode(' ', $words);
        $capitalized = implode(' ', array_map(fn($value) => self::capitalize($value), $arrayOfWords));

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
}