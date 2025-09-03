import React,{useState} from 'react';
import axios, { AxiosError } from "axios";

type TambahProps = {
  setShowTambah: React.Dispatch<React.SetStateAction<boolean>>;
  getAnggota: () => void;
};

function Tambah({ setShowTambah, getAnggota}: TambahProps) {
  const [formData, setFormData] = useState({
    id_anggota: "",
    nama: "",
    jk: "laki-laki",
    kelas: "",
    no_telp: "",

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
      
  
      await axios.post("http://127.0.0.1:8000/api/anggota", formData, {
        headers: { Accept: "application/json" },
      });
  
      getAnggota();
      setShowTambah(false);
    } catch (err) {
      const error = err as AxiosError<{ [key: string]: string[] }>;
      console.error("Gagal menambahkan anggota:", error.message);
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
      <h2 className="text-xl font-bold mb-4">Tambah Anggota</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-black overflow-y-scroll  max-h-[70vh] pr-2 ">
        <label htmlFor="id_anggota" className='block mb-1 text-sm font-semibold text-black' >ID Anggota</label>
        <input
          type="text"
          id='id_anggota'
          name="id_anggota"
          placeholder=" Masukkan id_anggota"
          value={formData.id_anggota}
          onChange={handleChange}
          className="w-full border p-2 rounded  text-black bg-gray-200"
          required
        />

        <label htmlFor="nama" className='block mb-1 text-sm font-semibold text-black'>Nama</label>
        <input
          type="text"
          id='nama'
          name="nama"
          placeholder="Masukan Nama "
          value={formData.nama}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-gray-200"
          required
        />

        <label htmlFor="jk" className='block mb-1 text-sm font-semibold text-black'>JK</label>
        <select
          id='jk'
          name="jk"
          className="w-full border bg-gray-200 p-2 rounded "
          value={formData.jk}
          onChange={(e) => setFormData({ ...formData, jk: e.target.value })}
        >
          <option value="laki-laki">laki-laki</option>
          <option value="perempuan">perempuan</option>
        </select>

        <label htmlFor="kelas" className='block mb-1 text-sm font-semibold text-black'>Kelas</label>
        <input
          type="number"
          id='kelas'
          name="kelas"
          placeholder=" Masukan Kelas "
          value={formData.kelas}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-gray-200"
          required
        />


        <label htmlFor="no_telp" className='block mb-1 text-sm font-semibold text-black'>No Telp</label>
        <input
          type="text"
          id='no_telp'
          name="no_telp"
          placeholder="Masukan no_telp "
          value={formData.no_telp}
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