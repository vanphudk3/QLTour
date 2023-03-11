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
        Schema::create('lich_trinhs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ma_tour')->constrained('tours');
            $table->text('tieu_de')->nullable();
            $table->text('noi_dung')->nullable();
            $table->dateTime('lich_trinh_ngay');
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
        Schema::dropIfExists('lich_trinhs');
    }
};
