<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTaggablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('taggables', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
			$table->integer('taggable_id')->unsigned();
    		$table->string('taggable_type');  
    		$table->integer('tag_id')->unsigned();
    		$table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('taggables');
    }
}
