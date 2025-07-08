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
        Schema::create('session_in_halls', function (Blueprint $table) {
            $table->id();
            $table->dateTime('session_time');
            $table->foreignId('film_id')
                ->constrained('films')
                ->onDelete('cascade');
            $table->foreignId('cinema_hall_id')
                ->constrained('cinema_halls')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('session_in_halls');
    }
};
