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
        Schema::create('binh_luans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ma_tour')->constrained('tours');
            $table->foreignId('ma_khach_hang')->constrained('khach_hangs');
            $table->string('noi_dung');
            $table->integer('so_sao');
            $table->boolean('trang_thai')->default(0);
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
        Schema::dropIfExists('binh_luans');
    }
};
