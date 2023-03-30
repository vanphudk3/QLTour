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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ma_khach_hang')->nullable()->constrained('khach_hangs');
            $table->foreignId('ma_nhan_vien')->nullable()->constrained('users');
            $table->string('ten_nguoi_dat');
            $table->char('so_dien_thoai', 11);
            $table->string('email');
            $table->string('dia_chi');
            $table->timeTz('gio_khoi_hanh');
            $table->double('tong_tien');
            $table->enum('trang_thai', ['0', '1', '2']);
            $table->enum('hinh_thuc_thanh_toan', ['0', '1', '2', '3']);
            $table->string('ghi_chu')->nullable();
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
        Schema::dropIfExists('orders');
    }
};
