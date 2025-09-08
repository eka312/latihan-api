<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'total_anggota' => DB::table('anggota')->count(),
            'total_buku' => DB::table('buku')->count(),
            'anggota_terbaru' => DB::table('anggota')->orderBy('id', 'desc')->limit(5)->get(),
            'buku_terbaru' => DB::table('buku')->orderBy('id', 'desc')->limit(5)->get(),
        ]);
    }

}
