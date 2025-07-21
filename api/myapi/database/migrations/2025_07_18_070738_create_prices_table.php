<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('prices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cinema_hall_id')
                ->constrained('cinema_halls')
                ->onDelete('cascade');
            $table->foreignId('session_in_hall_id')
                ->constrained('session_in_halls')
                ->onDelete('cascade');
            $table->string('seat_type');
            $table->decimal('price', 10, 2)
                ->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prices');
    }
};
