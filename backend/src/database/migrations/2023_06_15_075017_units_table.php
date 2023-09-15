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
        Schema::create('units', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('key')->unique();
            $table->boolean('is_avator')->default(false);
            $table->boolean('is_servant')->default(false);
            $table->integer('gender')->default(0);
            $table->integer('is_child')->default(0);
            $table->string('class');
            $table->integer('class_id')->default(0);
            $table->integer('growth_rate_hp')->default(0);
            $table->integer('growth_rate_str')->default(0);
            $table->integer('growth_rate_mag')->default(0);
            $table->integer('growth_rate_skl')->default(0);
            $table->integer('growth_rate_spd')->default(0);
            $table->integer('growth_rate_lck')->default(0);
            $table->integer('growth_rate_def')->default(0);
            $table->integer('growth_rate_res')->default(0);
            $table->integer('max_str')->default(0);
            $table->integer('max_mag')->default(0);
            $table->integer('max_skl')->default(0);
            $table->integer('max_spd')->default(0);
            $table->integer('max_lck')->default(0);
            $table->integer('max_def')->default(0);
            $table->integer('max_res')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('units');
    }
};
