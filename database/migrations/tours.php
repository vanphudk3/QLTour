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
        Schema::create('tours', function (Blueprint $table) {
            $table->id();
            $table->string('ky_hieu')->unique();
            $table->string('ten_tour');
            $table->enum('transpost', ['Car', 'Plane', 'Train', 'Bus']);
            $table->integer('do_tuoi_tu');
            $table->double('gia_nguoi_lon');
            $table->double('gia_thieu_nien');
            $table->double('gia_tre_em');
            $table->string('ma_khuyen_mai')->nullable();
            $table->date('ngay_khoi_hanh');
            $table->integer('so_ngay');
            $table->integer('so_dem');
            $table->integer('so_cho');
            $table->integer('so_cho_da_ban')->default(0);
            $table->integer('so_cho_con_lai')->default(0);
            $table->integer('so_cho_da_huy')->default(0);
            $table->text('mo_ta')->nullable();
            $table->string('yeu_cau')->nullable();
            $table->string('luu_y')->nullable();
            $table->enum('status', ['active', 'inactive']);
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
        Schema::dropIfExists('tours');
    }
};
