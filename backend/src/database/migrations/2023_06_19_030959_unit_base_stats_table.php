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
        Schema::create('unit_base_stats', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('unit_id')->default(0);
            $table->string('key');
            $table->string('suffix');
            $table->boolean('is_visible')->default(false);
            $table->integer('lv')->default(0);
            $table->integer('hp')->default(0);
            $table->integer('str')->default(0);
            $table->integer('mag')->default(0);
            $table->integer('skl')->default(0);
            $table->integer('spd')->default(0);
            $table->integer('lck')->default(0);
            $table->integer('def')->default(0);
            $table->integer('res')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unit_base_stats');
    }
};
