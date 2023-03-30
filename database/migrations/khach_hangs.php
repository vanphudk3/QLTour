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
        Schema::create('khach_hangs', function (Blueprint $table) {
            $table->id();
            $table->string('ten_khach_hang');
            $table->string('email')->unique();
            $table->string('citizen_identification_number')->unique();
            $table->char('so_dien_thoai', 10);
            $table->text('dia_chi');
            $table->string('mat_khau');
            $table->date('ngay_sinh');
            $table->string('remember_token')->nullable();
            $table->integer('tong_so_tour_da_di')->default(0);
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
        Schema::dropIfExists('khach_hangs');
    }
};
