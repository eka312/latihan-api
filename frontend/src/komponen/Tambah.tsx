import React,{useState} from 'react';
import axios, { AxiosError } from "axios";

type TambahProps = {
  setShowTambah: React.Dispatch<React.SetStateAction<boolean>>;
  getBuku: () => void;
};

function Tambah({ setShowTambah, getBuku}: TambahProps) {
  const [formData, setFormData] = useState({
    judul: "",
    pengarang: "",
    penerbit: "",
    tahun_terbit: "",
    kategori: "",
    jumlah: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const payload = {
        ...formData,
        tahun_terbit: parseInt(formData.tahun_terbit),
        jumlah: parseInt(formData.jumlah),
      };
  
      await axios.post("http://127.0.0.1:8000/api/buku", payload, {
        headers: { Accept: "application/json" },
      });
  
      getBuku();
      setShowTambah(false);
    } catch (err) {
      const error = err as AxiosError<{ [key: string]: string[] }>;
      console.error("Gagal menambahkan buku:", error.message);
      console.log("Detail error dari Laravel:", error.response?.data);
    }
  };

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Background hitam blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs"></div>

      {/* Modal Form */}
      <div className="relative bg-white text-black rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] 
        animate__animated animate__zoomIn ">
      <h2 className="text-xl font-bold mb-4">Tambah Buku</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-black overflow-y-scroll  max-h-[70vh] pr-2 ">
        <label htmlFor="judul" className='block mb-1 text-sm font-semibold text-black' >Judul Buku</label>
        <input
          type="text"
          id='judul'
          name="judul"
          placeholder=" Masukkan Judul Buku"
          value={formData.judul}
          onChange={handleChange}
          className="w-full border p-2 rounded  text-black bg-gray-200"
          required
        />

        <label htmlFor="pengarang" className='block mb-1 text-sm font-semibold text-black'>Pengarang</label>
        <input
          type="text"
          id='pengarang'
          name="pengarang"
          placeholder="Masukan Nama Pengarang"
          value={formData.pengarang}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-gray-200"
          required
        />

        <label htmlFor="penerbit" className='block mb-1 text-sm font-semibold text-black'>Penerbit</label>
        <input
          type="text"
          id='penerbit'
          name="penerbit"
          placeholder=" Masakun Nama Penerbit"
          value={formData.penerbit}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-gray-200"
          required
        />

        <label htmlFor="tahun_terbit" className='block mb-1 text-sm font-semibold text-black'>Tahun Terbit</label>
        <input
          type="number"
          id='tahun_terbit'
          name="tahun_terbit"
          placeholder=" Masukan Tahun Terbit 'YYYY' "
          value={formData.tahun_terbit}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-gray-200"
          required
        />

        <label htmlFor="kategori" className='block mb-1 text-sm font-semibold text-black'>Kategori</label>
        <select
          id='kategori'
          name="kategori"
          className="w-full border bg-gray-200 p-2 rounded "
          value={formData.kategori}
          onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
        >
          <option value="Novel">Novel</option>
          <option value="Komik">Komik</option>
          <option value="Pelajaran">Pelajaran</option>
          <option value="Biografi">Biografi</option>
        </select>


        <label htmlFor="jumlah" className='block mb-1 text-sm font-semibold text-black'>Jumlah</label>
        <input
          type="number"
          id='jumlah'
          name="jumlah"
          placeholder="Masukan Jumlah Buku"
          value={formData.jumlah}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-gray-200"
          required
        />

        {/* Tombol Aksi */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={() => setShowTambah(false)}
            className="px-8 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition"
          >
            Batal
          </button>
        </div>
      </form>
      </div>
    </div>
   
    </>


  );
}

export default Tambah