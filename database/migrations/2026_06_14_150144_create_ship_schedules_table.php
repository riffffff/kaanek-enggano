<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ship_schedules', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['ferry', 'susi_air']);
            $table->string('route');
            $table->json('days');
            $table->time('departure_time');
            $table->integer('estimated_price')->nullable();
            $table->string('ticket_link')->nullable();
            $table->string('agent_whatsapp_number', 20)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ship_schedules');
    }
};
