<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('groups', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('dept_id')->unsigned()->nullable();
            $table->timestamps();
            $table->string('name');         
			$table->integer('group_type_id')->unsigned();
			$table->foreign('group_type_id')->references('id')->on('group_types');
			$table->integer('parent_group_id')->unsigned()->nullable();
			$table->foreign('parent_group_id')->references('id')->on('groups');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('groups');
    }
}
