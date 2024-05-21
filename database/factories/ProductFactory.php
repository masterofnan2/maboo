<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->colorName(),
            'description' => fake()->sentences(5, true),
            'user_id' => 1,
            'price' => fake()->numberBetween(10000, 10000000),
            'inStock' => fake()->numberBetween(10, 100),
            'category_id' => fake()->numberBetween(1, 20),
            'slug' => fake()->slug(),
            'sale_price' => 0,
        ];
    }
}
