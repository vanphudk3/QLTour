<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tour_diadiems', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ma_tour')->constrained('tours');
            $table->foreignId('ma_dia_diem')->constrained('dia_diems');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tour_diadiems');
    }
};
