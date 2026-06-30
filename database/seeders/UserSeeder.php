<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@enggano.village.id'],
            [
                'name' => 'Admin KKN',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        User::query()->updateOrCreate(
            ['email' => 'editor@enggano.village.id'],
            [
                'name' => 'Editor Villages',
                'password' => Hash::make('password'),
                'role' => 'editor',
            ]
        );
    }
}
