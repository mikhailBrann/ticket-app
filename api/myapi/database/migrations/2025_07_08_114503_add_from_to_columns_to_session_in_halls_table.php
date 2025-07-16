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
        Schema::table('session_in_halls', function (Blueprint $table) {
            $table->timestamp('from')->nullable();
            $table->timestamp('to')->nullable();
            
            $table->dropColumn('session_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('session_in_halls', function (Blueprint $table) {
            $table->dropColumn(['from', 'to']);
            
            $table->timestamp('session_time')->nullable();
        });
    }
};
