<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSchemaTemplateVersionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schema_template_versions', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('version')->unsigned();
            $table->boolean('active');
            $table->text('data_schema'); // switch to json type later?
			$table->softDeletes();
    		$table->integer('schema_template_id')->unsigned();
    		$table->foreign('schema_template_id')->references('id')->on('schema_templates');
    		$table->integer('parent_version_id')->unsigned()->nullable();
    		$table->foreign('parent_version_id')->references('id')->on('schema_template_versions');     		           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('schema_template_versions');
    }
}
