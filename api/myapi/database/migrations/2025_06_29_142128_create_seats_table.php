<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\CinemaHall;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create(
            'seats', 
            function (Blueprint $table) 
        {
            $table->id();
            $table->enum('type', ['vip', 'regular']);
            $table->integer('row');
            $table->integer('number');
            $table
                ->foreignId('cinema_hall_id')
                ->constrained()
                ->onDelete('cascade');
            $table->timestamps();
            $table->unique(['cinema_hall_id', 'row', 'number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seats');
    }
};
