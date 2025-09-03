<?php

namespace Database\Seeders;

use App\Models\anggota;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnggotaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create('id_ID');
        for($i = 0; $i < 5; $i++) {
            anggota::create([
                'id_anggota' => $faker->unique()->numerify('A####'),
                'nama' => $faker->name(),
                'jk' => $faker->randomElement(['laki-laki', 'perempuan']),
                'kelas' => $faker->randomElement(['10', '11', '12']),
                'no_telp' => $faker->phoneNumber(),
            ]);
        }
    }
}
