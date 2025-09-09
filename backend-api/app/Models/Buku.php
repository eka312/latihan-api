<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Buku extends Model
{
    use HasFactory;
    protected $table = "buku";
    protected $primaryKey = 'id_buku';
    protected $fillable = [
        'judul', 
        'pengarang',
        'penerbit', 
        'tahun_terbit', 
        'kategori', 
        'jumlah'
    ];

    public function peminjaman()
    {
        return $this->hasMany(Peminjaman::class, 'id_buku', 'id_buku');
    }
}
