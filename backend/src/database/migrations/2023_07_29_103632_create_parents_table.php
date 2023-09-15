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
        Schema::create('parents', function (Blueprint $table) {
            $table->id();
            $table->integer('unit_id')->default(0);
            $table->integer('fixed_parent')->default(0);
            $table->integer('possible_parent')->default(0);
            $table->string('unit_key');
            $table->string('fixed_parent_key');
            $table->string('possible_parent_key');
            $table->timestamps();
        });
    }		

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parents');
    }
};
