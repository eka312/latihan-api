import React,{useState, useEffect} from 'react';
import axios, { AxiosError } from "axios";

type Edit = {
    id_peminjaman: number;
    id_buku: number;
    idKey: number;
    tanggal_pinjam: string;
    tanggal_kembali: string;
    status: string;
};

type EditProps = {
    id_peminjaman: number | string;
    dataPeminjaman: Edit;
    setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
    getPeminjaman: () => void;
}

function EditPinjam({ id_peminjaman, dataPeminjaman,  setShowEdit, getPeminjaman}: EditProps) {
    const [formData, setFormData] = useState({
        id_buku: dataPeminjaman.id_buku?.toString() ?? "",
        idKey: dataPeminjaman.idKey?.toString() ?? "",
        tanggal_pinjam: dataPeminjaman.tanggal_pinjam ?? "",
        tanggal_kembali: dataPeminjaman.tanggal_kembali ?? "",
        status: dataPeminjaman.status ?? "",
    });

    const [anggotaList, setAnggotaList] = useState<{ idKey: number; nama: string }[]>([]);
    const [bukuList, setBukuList] = useState<{ id_buku: number; judul: string }[]>([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/anggota", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then(res => setAnggotaList(res.data.data));


        axios.get("http://127.0.0.1:8000/api/buku" , {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then(res => setBukuList(res.data.data));

    },[]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            const payload = {
                ...formData,
                id_buku: parseInt(formData.id_buku),   
                idKey: parseInt(formData.idKey),
            };

            await axios.put(`http://127.0.0.1:8000/api/peminjaman/${id_peminjaman}` ,   payload, {
                headers: {
                    Accept: "application/json" ,    
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            getPeminjaman();
            setShowEdit(false);
        } catch (err) {
            const error = err as AxiosError<{ [key: string]: string[] }>;
            console.error("Gagal update peminjaman:", error.message);
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
                <h2 className="text-xl font-bold mb-4">Edit Peminjaman</h2>
                <form onSubmit={handleSubmit} className="space-y-4 text-black overflow-y-scroll  max-h-[70vh] pr-2 ">
                    
                    <label htmlFor="idKey" className='block mb-1 text-sm font-semibold text-black' >Nama Anggota</label>
                    <select
                        id="idKey"
                        name="idKey"
                        value={formData.idKey}
                        onChange={(e) => setFormData({ ...formData, idKey: e.target.value })}
                        className="w-full border p-2 rounded bg-gray-200  "
                        required
                    >
                        <option value=""  >-- Pilih Anggota --</option>
                        {anggotaList.map((a) => (
                            <option key={a.idKey} value={a.idKey} className=' w-auto truncate ' title={a.nama} >
                                {a.nama}
                            </option>
                        ))}
                    </select>
                    

                    <label htmlFor="id_buku" className='block mb-1 text-sm font-semibold text-black'>Judul Buku</label>
                    <select
                        id="id_buku"
                        name="id_buku"
                        value={formData.id_buku}
                        onChange={(e) => setFormData({ ...formData, id_buku: e.target.value })}
                        className="w-full border p-2 rounded bg-gray-200"
                        required
                    >
                        <option value="">-- Pilih Buku --</option>
                        {bukuList.map((b) => (
                            <option key={b.id_buku} value={b.id_buku}>
                                {b.judul}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="tanggal_pinjam" className='block mb-1 text-sm font-semibold text-black'>Tanggal Pinjam</label>
                    <input
                        type="date"
                        id='tanggal_pinjam'
                        name="tanggal_pinjam"
                        value={formData.tanggal_pinjam}
                        onChange={(e) => setFormData({ ...formData, tanggal_pinjam: e.target.value })}
                        className="w-full border p-2 rounded bg-gray-200"
                        required
                    />

                    <label htmlFor="tanggal_kembali" className='block mb-1 text-sm font-semibold text-black'>Tanggal Pengembalian</label>
                    <input
                        type="date"
                        id='tanggal_kembali'
                        name="tanggal_kembali"
                        value={formData.tanggal_kembali}
                        onChange={(e) => setFormData({ ...formData, tanggal_kembali: e.target.value })}
                        className="w-full border p-2 rounded bg-gray-200"
                        required
                    />

                    <label htmlFor="status" className='block mb-1 text-sm font-semibold text-black'>Status</label>
                    <select
                        id='status'
                        name="status"
                        className="w-full border bg-gray-200 p-2 rounded "
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                        <option value="dipinjam">Dipinjam</option>
                        <option value="dikembalikan">Dikembalikan</option>
                    </select>

                

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
                        onClick={() => setShowEdit(false)}
                        className="px-8 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition"
                    >
                        Batal
                    </button>
                    </div>
                </form>
                </div>
            </div>            
        </>
    )
}

export default EditPinjam;