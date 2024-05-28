<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create(['type' => ADMIN]);
        User::factory(10)->create(['type' => SELLER]);
        User::factory(10)->create(['type' => CUSTOMER]);

        Category::factory(2)->create();
        Category::factory(4)->create(['parent_id' => 1]);
        Category::factory(4)->create(['parent_id' => 2]);

        for ($i = 3; $i < 11; $i++) {
            Category::factory(4)->create(['parent_id' => $i]);
        }

        Product::factory(20)->create();
    }
}
