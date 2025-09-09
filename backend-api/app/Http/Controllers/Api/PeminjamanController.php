<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Peminjaman;
use Illuminate\Http\Request;

class PeminjamanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dataPeminjaman = Peminjaman::with([
            'anggota:idKey,nama',
            'buku:id_buku,judul'
        ])
        ->orderBy('id_peminjaman', 'desc')
        ->get();



        return response()->json([
            'status' => true,
            'message' => 'Data Peminjam Berhasil Diambil',
            'data' => $dataPeminjaman
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
 
        $request->validate([
            'idKey' => 'required|exists:anggota,idKey',
            'id_buku' => 'required|exists:buku,id_buku',
            'tanggal_pinjam' => 'required|date',
            'tanggal_kembali' => 'required|date|after_or_equal:tanggal_pinjam',
            'status' => 'required|in:dipinjam,dikembalikan',
        ]);

        $dataPeminjaman = Peminjaman::create($request->all());

        $dataPeminjaman->load([
            'anggota:idKey,nama',
            'buku:id_buku,judul'
        ]);
        
    
        return response()->json([
            'status' => true,
            'message' => 'Data Peminjaman Berhasil Disimpan',
            'data' => $dataPeminjaman
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'idKey' => 'sometimes|required|exists:anggota,idKey',
            'id_buku' => 'sometimes|required|exists:buku,id_buku',
            'tanggal_pinjam' => 'sometimes|required|date',
            'tanggal_kembali' => 'sometimes|required|date|after_or_equal:tanggal_pinjam',
            'status' => 'sometimes|required|in:dipinjam,dikembalikan',
        ]);

        $dataPeminjaman = Peminjaman::find($id);

        if (!$dataPeminjaman) {
            return response()->json([
                'status' => false,
                'message' => 'Data Peminjaman Tidak Ditemukan',
                'data' => null
            ], 404);
        }

        $dataPeminjaman->update($request->all());

        $dataPeminjaman->load([
            'anggota:idKey,nama',
            'buku:id_buku,judul'
        ]);
        

        return response()->json([
            'status' => true,
            'message' => 'Data Peminjaman Berhasil Diupdate',
            'data' => $dataPeminjaman
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dataPeminjaman = Peminjaman::find($id);

        if (!$dataPeminjaman) {
            return response()->json([
                'status' => false,
                'message' => 'Data Peminjaman Tidak Ditemukan',
            ], 404);
        }

        $delete = $dataPeminjaman->delete();

        return response()->json([
            'status' => $delete ? true : false,
            'message' => $delete ? 'Data Peminjaman Berhasil Dihapus' : 'Data Peminjaman Gagal Dihapus',
            'data' => null
        ], $delete ? 200 : 500);
    }
}
