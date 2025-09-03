<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\anggota;
use Illuminate\Http\Request;

class AnggotaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $anggota = Anggota::orderBy('idKey', 'asc')->get();
        return response()->json([
            'status' => true,
            'message' => 'Data Anggota Berhasil Diambil',
            'data' => $anggota
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_anggota' => 'required|string|max:10|unique:anggota,id_anggota',
            'nama' => 'required|string|max:255',
            'jk' => 'required|in:laki-laki,perempuan',
            'kelas' => 'required|string|max:50',
            'no_telp' => 'required|string|max:15',
        ]);

        $anggota = new Anggota;
        $anggota->id_anggota = $request->id_anggota;
        $anggota->nama = $request->nama;
        $anggota->jk = $request->jk;
        $anggota->kelas = $request->kelas;
        $anggota->no_telp = $request->no_telp;

        $save = $anggota->save();

        return response()->json([
            'status' => $save ? true : false,
            'message' => $save ? 'Data Anggota Berhasil Disimpan' : 'Data Anggota Gagal Disimpan',
            'data' => $save ? $anggota : null
        ], $save ? 201 : 500);
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
    public function update(Request $request, string $idKey)
    {
        $request->validate([
            'id_anggota' => 'required|string|max:10|unique:anggota,id_anggota,' . $idKey . ',idKey',
            'nama'       => 'required|string|max:255',
            'jk'         => 'required|in:laki-laki,perempuan',
            'kelas'      => 'required|string|max:50',
            'no_telp'    => 'required|string|max:15',
        ]);

        $anggota = Anggota::findOrFail($idKey);

        $anggota->update($request->all());

        return response()->json([
            'status'  => true,
            'message' => 'Data Anggota Berhasil Diupdate',
            'data'    => $anggota,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $idKey)
    {
        $anggota = Anggota::findOrFail($idKey);
        $anggota->delete();
    
        return response()->json([
            'status'  => true,
            'message' => 'Data Anggota Berhasil Dihapus',
        ], 200);
    }
}

