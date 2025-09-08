<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
   

    public function register(Request $request) {
        /**
        * Jalankan proses validasi sebelum melakukan 
        * registrasi user
        */
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);

        /**
        * Proses create user baru
        */

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        /**
        * Dengan method createToken
        * User yang baru saja melakukan registrasi akan mendapatkan token
        * 
        */

        $token = $user->createToken('register_token')->plainTextToken;

        /**
        * Return response dalam bentuk json
        */

        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'User berhasil registrasi',
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(Request $request)
    {
        // Validasi input
        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);
    
        // Cari user berdasarkan email
        $user = User::where('email', $fields['email'])->first();
    
        // Kalau email tidak ditemukan atau password salah
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json([
                'status' => Response::HTTP_UNAUTHORIZED,
                'message' => 'Email atau password salah'
            ], Response::HTTP_UNAUTHORIZED);
        }
    
        // Hapus token lama biar nggak numpuk
        $user->tokens()->delete();
    
        // Buat token baru
        $token = $user->createToken('login_token')->plainTextToken;
    
        // Balikkan JSON response, bukan redirect
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'User berhasil login',
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request) {
        /**
        * Logout user dengan menghapus token yang digunakan untuk login
        */
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'User berhasil logout'
        ]);
    }
}
