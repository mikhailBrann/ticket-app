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
        Schema::create('booking', function (Blueprint $table) {
            $table->id();
             // id фильма (предполагается таблица films)
            $table->boolean('is_active')->default(false);
            $table
                ->foreignId('film_id')
                ->constrained('films')
                ->cascadeOnDelete();
            $table->jsonb('seat_id_list');
            $table
                ->foreignId('cinema_hall_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->unsignedBigInteger('session_in_hall_id')->index();
            $table->decimal('summ');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking');
    }
};
