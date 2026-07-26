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
        Schema::table('local_guides', function (Blueprint $table) {
            $table->dropColumn('expertise');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('local_guides', function (Blueprint $table) {
            $table->text('expertise')->nullable()->after('whatsapp_number');
        });
    }
};
