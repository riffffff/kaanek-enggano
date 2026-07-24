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
        Schema::table('destinations', function (Blueprint $table) {
            $table->dropForeign(['local_guide_id']);
            $table->dropColumn(['local_guide_id', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('destinations', function (Blueprint $table) {
            $table->enum('type', ['bahari', 'history', 'wildlife'])->after('description');
            $table->foreignId('local_guide_id')->nullable()->constrained('local_guides')->nullOnDelete()->after('type');
        });
    }
};
