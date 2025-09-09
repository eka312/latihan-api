<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Buku;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BukuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Buku::orderBy('id_buku', 'desc')->get();
        return response()->json([
            'status' => true,
            'message' => 'Data Buku Berhasil Diambil',
            'data' => $data
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dataBuku = new Buku;
        $kategori = ucfirst(strtolower($request->kategori));
        $request->merge(['kategori' => $kategori]);

        $request->validate([
            'judul' => 'required|string|max:255',
            'pengarang' => 'required|string|max:255',
            'penerbit' => 'required|string|max:255',
            'tahun_terbit' => 'required|integer',
            'kategori' => 'required|in:Novel,Komik,Pelajaran,Biografi',
            'jumlah' => 'required|integer|min:1',
            
        ]);



        $dataBuku->judul = $request->judul;
        $dataBuku->pengarang = $request->pengarang;
        $dataBuku->penerbit = $request->penerbit;
        $dataBuku->tahun_terbit = $request->tahun_terbit;
        $dataBuku->kategori = $request->kategori;
        $dataBuku->jumlah = $request->jumlah;

        $post = $dataBuku->save();

        return response()->json([
            'status' => $post ? true : false,
            'message' => $post ? 'Data Buku Berhasil Disimpan' : 'Data Buku Gagal Disimpan',
            'data' => $post ? $dataBuku : null
        ], $post ? 201 : 500);
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
            'judul' => 'required|string|max:255',
            'pengarang' => 'required|string|max:255',
            'penerbit' => 'required|string|max:255',
            'tahun_terbit' => 'required|integer',
            'kategori' => 'required|in:Novel,Komik,Pelajaran,Biografi',
            'jumlah' => 'required|integer|min:1',
            
        ]);

        $dataBuku = Buku::find($id);


        if (!$dataBuku) {
            return response()->json([
                'status' => false,
                'message' => 'Data Buku tidak ditemukan'
            ], 404);
        }

        $dataBuku->judul = $request->judul;
        $dataBuku->pengarang = $request->pengarang;
        $dataBuku->penerbit = $request->penerbit;
        $dataBuku->tahun_terbit = $request->tahun_terbit;
        $dataBuku->kategori = $request->kategori;
        $dataBuku->jumlah = $request->jumlah;

        $dataBuku->update($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Data Buku Berhasil Diupdate',
            'data' => $dataBuku
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dataBuku = Buku::find($id);

        if (!$dataBuku) {
            return response()->json([
                'status' => false,
                'message' => 'Data Buku tidak ditemukan'
            ], 404);
        }

        $dataBuku->delete();

        return response()->json([
            'status' => true,
            'message' => 'Data Buku Berhasil Dihapus'
        ], 200);
    }
}
