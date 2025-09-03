<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use illuminate\Http\Response;
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

    public function login(Request $request) {
        /**
        * Validasi inputan user
        */
        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        /**
        * Cek ke model User apa data yang diinputkan
        * sama dengan data yang ada pada DB / tabel
        */
        $user = User::where('email', $fields['email'])->first();

        /**
        * Jika tidak return response json berikut.
        */
        if(!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json([
                'status' => Response::HTTP_UNAUTHORIZED,
                'message' => 'Email atau password salah'
            ]);
        }

        /**
        * Jika berhasil, buat token baru untuk user
        */
        $token = $user->createToken('login_token')->plainTextToken;

        /**
        * Return response dalam bentuk json
        */
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
