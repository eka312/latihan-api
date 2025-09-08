<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Anggota extends Model
{
    use HasFactory;
    protected $table = 'anggota';
    protected $primaryKey = 'idKey';
    protected $fillable = [
        'id_anggota',
        'nama',
        'jk',
        'kelas',
        'no_telp',
    ];

}
