<?php

namespace Database\Seeders;

use App\Models\Peminjaman;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class peminjamanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create('id_ID');

        // daftar ID yang ada
        $anggotaIds = array_merge([5,8,9,10], range(12,26));
        $bukuIds = array_merge([3,4,10,11], range(19,43));

        for ($i = 0; $i < 2; $i++) {
            Peminjaman::create([
                'idKey' => $faker->randomElement($anggotaIds), // id anggota
                'id_buku' => $faker->randomElement($bukuIds), // id buku
                'tanggal_pinjam' => $faker->dateTimeBetween('-1 week', 'now')->format('Y-m-d'),
                'tanggal_kembali' => $faker->dateTimeBetween('now', '+1 week')->format('Y-m-d'),
                'status' => $faker->randomElement(['dipinjam', 'dikembalikan']),
            ]);
        }

        

    }
}
