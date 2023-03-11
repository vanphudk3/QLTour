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
        Schema::create('chi_tiet_tours', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ma_tour')->constrained('tours');
            $table->string('noi_khoi_hanh');
            $table->string('noi_tap_chung');
            $table->time('gio_khoi_hanh');
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
        Schema::dropIfExists('chi_tiet_tours');
    }
};
