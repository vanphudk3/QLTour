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
        Schema::create('dia_diems', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ma_loai_tour')->constrained('loai_tours');
            $table->string('ten');
            $table->text('mo_ta');
            $table->text('dia_chi');
            $table->text('du_lieu_map')->nullable();
            $table->string('vi_do')->nullable();
            $table->string('kinh_do')->nullable();
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
        Schema::dropIfExists('dia_diems');
    }
};
