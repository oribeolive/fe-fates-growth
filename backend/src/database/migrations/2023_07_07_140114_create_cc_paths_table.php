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
        Schema::create('cc_paths', function (Blueprint $table) {
            $table->id();
            $table->integer('lower_class_id')->default(0);
            $table->integer('upper_class_id')->default(0);
            $table->string('lower_class_key');
            $table->string('upper_class_key');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cc_paths');
    }
};
