<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('notable_id')->unsigned();
            $table->string('notable_type');
            $table->string('subject');
            $table->text('message');
            $table->integer('user_id')->unsigned();
    		$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');;   
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('notes');
    }
}
