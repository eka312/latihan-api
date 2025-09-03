<?php

namespace Database\Seeders;

use App\Models\Buku;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BukuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create('id_ID');
        for($i = 0; $i < 5; $i++) {
            Buku::create([
                'judul' => $faker->sentence(3),
                'pengarang' => $faker->name(),
                'penerbit' => $faker->company(),
                'tahun_terbit' => $faker->year(),
                'kategori' => $faker->randomElement(['Novel','Komik','Pelajaran','Biografi']),
                'jumlah' => $faker->numberBetween(1, 100),
            ]);
        }
    }
}
