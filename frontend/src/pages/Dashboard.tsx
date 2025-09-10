import {useEffect, useState } from "react";
import Sidebar from "../komponen/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Anggota {
  idKey: number;
  id_anggota: string;
  nama: string;
  jk: string;
  kelas: string;
  no_telp: string;
}

interface Buku {
  id_buku: number;
  judul: string;
  pengarang: string;
  tahun_terbit: string;
  kategori: string;
  jumlah: number;
}

interface Peminjaman {
  id_peminjaman: number;
  id_buku: number;
  idKey: number;
  tanggal_pinjam: string;
  tanggal_kembali: string;
  status: string;
}

export default function Dashboard() {
  // const data = [
  //   { bulan: "Jan", jumlah: 5 },
  //   { bulan: "Feb", jumlah: 8 },
  //   { bulan: "Mar", jumlah: 3 },
  //   { bulan: "Apr", jumlah: 10 },
  //   { bulan: "Mei", jumlah: 7 },
  //   { bulan: "Jun", jumlah: 18 },
  //   { bulan: "Jul", jumlah: 10 },
  //   { bulan: "Agu", jumlah: 4 },
  //   { bulan: "Sep", jumlah: 11 },
  //   { bulan: "Okt", jumlah: 15 },
  // ];

  const [anggota, setAnggota] = useState<Anggota[]>([]);
  const [buku, setBuku] = useState<Buku[]>([]);
  const [peminjamanAktif, setPeminjamanAktif] = useState<Peminjaman[]>([]);
  const [chartData, setChartData] = useState<{ bulan: string; jumlah: number }[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ambil data anggota
    fetch("http://127.0.0.1:8000/api/anggota", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal ambil anggota");
        return res.json();
      })
      .then((data) => setAnggota(data.data))
      .catch((err) => console.error(err));
      


    // ambil data buku
    fetch("http://127.0.0.1:8000/api/buku", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal ambil buku");
        return res.json();
      })
      .then((data) => setBuku(data.data))
      .catch((err) => console.error(err));


    // ambil data peminjaman
    fetch("http://127.0.0.1:8000/api/peminjaman", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal ambil peminjaman");
        return res.json();
      })
      .then((data) => {
        const peminjaman: Peminjaman[] = data.data;
        setPeminjamanAktif(peminjaman);

        // hitung peminjaman per bulan untuk grafik
        const bulanMap = [
          "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
          "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
        ];

          const counts: { [key: string]: number} = {};

          peminjaman.forEach((p) => {
            const date = new Date(p.tanggal_pinjam);
            const bulan = bulanMap[date.getMonth()];
            counts[bulan] = (counts[bulan] || 0) + 1;
          });

          const formatted = bulanMap.map((b) => ({
            bulan: b,
            jumlah: counts[b] || 0,
          }));

          setChartData(formatted);
      })
      
      .catch((err) => console.error(err));
    


  
  }, []);





  return (
        <div className="flex min-h-screen ">
          <div className="w-15 lg:w-58 ">
            <Sidebar />
          </div>
          <div className="flex-1 p-4 sm:p-6">
            <header className="mb-6">
              <h3 className="font-bold text-xl sm:text-2xl">
                Selamat Datang di Perpus App!
              </h3>
              <p className="text-gray-500 text-sm sm:text-base">
                Ringkasan data perpustakaan
              </p>
            </header>

            <main>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border-2 border-gray-300">
                  <h4 className="text-gray-600">Total Buku</h4>
                  <p className="text-2xl font-bold">{buku.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-2 border-gray-300">
                  <h4 className="text-gray-600">Total Anggota</h4>
                  <p className="text-2xl font-bold">{anggota.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-2 border-gray-300">
                  <h4 className="text-gray-600">Peminjaman Aktif</h4>
                  <p className="text-2xl font-bold">
                    {peminjamanAktif.filter((p) => p.status === "dipinjam").length}
                  </p>
                </div>
              </div>

              

              {/* Grafik */}
              <div className="mt-8 bg-white p-6 rounded-lg shadow border-2 border-gray-300">
                <h4 className="text-gray-600 mb-4">Peminjaman Bulanan</h4>
                <div className="h-64 ">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="bulan" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="jumlah"
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

             


              {/* Data terbaru */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

                {/* anggota terbaru */}
                <div className="bg-white shadow-md rounded-2xl p-4 overflow-x-auto border-2 border-gray-300">
                  <h4 className="text-gray-600 mb-4">Anggota Terbaru</h4>
                  <table className="w-full text-sm sm:text-base ">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="py-2">No</th>
                        <th className="py-2">ID Anggota</th>
                        <th className="py-2">Nama</th>
                        <th className="py-2">JK</th>
                        <th className="py-2">Kelas</th>
                        <th className="py-2">No.Telp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {anggota.slice(0,2).map((a, index) => (
                        <tr key={a.idKey} >
                          <td className="py-2">{index + 1}</td>
                          <td className="py-2">{a.id_anggota}</td>
                          <td className="py-2">{a.nama}</td>
                          <td className="py-2">{a.jk}</td>
                          <td className="py-2">{a.kelas}</td>
                          <td className="py-2">{a.no_telp}</td>
                        </tr>
                      ))}

                    </tbody>  
                  </table>
                </div>

                {/* buku terbaru */}

                <div className="bg-white shadow-md rounded-2xl p-4 overflow-x-auto border-2 border-gray-300">
                  <h4 className="text-gray-600 mb-4">Buku Terbaru</h4>
                  <table className="w-full text-sm sm:text-base ">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="py-2">No</th>
                        <th className="py-2">Judul</th>
                        <th className="py-2">Pengarang</th>
                        <th className="py-2">Tahun</th>
                        <th className="py-2">Kategori</th>
                        <th className="py-2">Jumlah</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buku.slice(0, 2).map((b, index) => (
                        <tr key={b.id_buku}>
                          <td className="py-2">{index + 1}</td>
                          <td className="py-2">{b.judul}</td>
                          <td className="py-2">{b.pengarang}</td>
                          <td className="py-2">{b.tahun_terbit}</td>
                          <td className="py-2">{b.kategori}</td>
                          <td className="py-2">{b.jumlah}</td>
                        </tr>
                      ))}

                    </tbody>      
                  </table>
                </div>
              </div>
            </main>


            
          </div>
        </div>
    );
}