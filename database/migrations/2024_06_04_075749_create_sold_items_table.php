<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sold_items', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('buyer_id');
            $table->foreignId('product_id');
            $table->foreignId('merchant_id');
            $table->foreignId('product_variant_id')->nullable();
            $table->foreignUuid('order_id');
            $table->smallInteger('quantity')->default(1);
            $table->integer('subtotal')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sold_items');
    }
};
