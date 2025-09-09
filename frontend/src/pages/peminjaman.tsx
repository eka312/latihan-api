import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Sidebar from "../komponen/Sidebar";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Tambah from "../komponen/peminjaman/tambahPinjam.tsx";
import Edit from "../komponen/peminjaman/editPinjam.tsx";
import { format } from 'date-fns';
import { DataTable } from 'primereact/datatable'
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

interface Peminjaman {

    id_peminjaman: number;
    id_buku: number;
    idKey: number;
    tanggal_pinjam: string;
    tanggal_kembali: string;
    status: string;
}

function Peminjaman() {
    const [peminjaman, setPeminjaman] = useState<Peminjaman[]>([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showTambah, setShowTambah] = useState(false);
    const [showHapus, setShowHapus] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedPeminjaman, setSelectedPeminjaman] = useState<Peminjaman | null>(null);
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const token = localStorage.getItem("token");

    const getPeminjaman = () => {
        axios
        .get("http://127.0.0.1:8000/api/peminjaman", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        })
        .then((res) => {
            console.log("Respon API Peminjaman:", res.data); 
            setPeminjaman(res.data.data); 
        })
        .catch((err) => console.error("Gagal ambil data peminjaman:", err));
    };

    useEffect(() => {
        getPeminjaman();
    }, []);

    const handleDelete = async () => {
        if (!selectedId) return;
        try {
            await axios.delete(`http://localhost:8000/api/peminjaman/${selectedId}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setShowHapus(false);
            setSelectedId(null);
            getPeminjaman();
        } catch (err) {
            const error = err as AxiosError<{ [key: string]: string[] }>;
            console.error("Gagal menghapus peminjaman:", error.message);
            console.log("Detail error:", error.response?.data);
        }
    };    


    // tombol aksi edit + hapus
    const actionBodyTemplate = (rowData: Peminjaman) => (
        <div className="flex justify-center gap-2">
            <button
                onClick={() => {
                    setSelectedId(rowData.id_peminjaman.toString());
                    setSelectedPeminjaman(rowData);
                    setShowEdit(true);
                }}
                className="bg-green-500 hover:bg-green-400  text-white p-2 rounded-lg transition"
                title="Edit"
            >
                <FaEdit  />
            </button>
            <button
                onClick={() => {
                    setSelectedId(rowData.id_peminjaman.toString());
                    setShowHapus(true);
                }}
                className="bg-red-500 hover:bg-red-400 text-white p-2 rounded-lg transition"
                title="Hapus"
            >
                <FaTrash />
            </button>
        </div>
    )

    return (
        <>
            <div className="flex min-h-screen ">
                <div className="w-18 lg:w-58 ">
                    <Sidebar />
                </div>
                <div className="flex-1 m-4 md:m-6 pb-7  rounded-2xl overflow-x-auto relative">
                    <div className="bg-white p-6 mt-2.5 border-2 border-gray-300  rounded-2xl shadow-lg ">
                        {/* Tombol & Judul */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-gray-700">Daftar Peminjaman</h2>
                            <button
                                onClick={() => setShowTambah(true)}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg transition"
                            >
                                <FaPlus /> Tambah
                            </button>
                        </div>

                        <div className="flex justify-start mb-4 overflow-x-auto">
                            <span className="p-input-icon-left">
                                <i className="pi pi-search !pl-3 text-gray-500" />
                                <InputText
                                value={globalFilter}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                placeholder="Cari buku..."
                                className="p-inputtext-sm w-64 !pl-8 "
                                />
                            </span>
                        </div>

                        {/* PrimeReact DataTable */}
                        <DataTable
                            value={peminjaman}
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 20, 30]}
                            stripedRows
                            scrollable
                            breakpoint="960px"
                            responsiveLayout="stack" 
                            globalFilter={globalFilter}
                            className="text-sm "
                            emptyMessage="Tidak ada data ditemukan."
                        >
                        <Column
                            header="No"
                            body={(_, options) => options.rowIndex + 1}
                            style={{ width: "4rem", textAlign: "center" }}
                        />
                        <Column field="anggota.nama" header="Nama Anggota" sortable />
                        <Column field="buku.judul" header="Judul Buku" sortable />
                        <Column 
                            field="tanggal_pinjam" 
                            header="Tgl Pinjam" 
                            sortable 
                            body={(rowData) => format(new Date(rowData.tanggal_pinjam), 'dd/MM/yyyy') }
                            
                        />
                        <Column 
                            field="tanggal_kembali" 
                            header="Tgl Kembali" 
                            sortable 
                            body={(rowData) => format(new Date(rowData.tanggal_kembali), "dd-MM-yyyy")}
                        />
                        <Column field="status" header="Status" sortable />
                        <Column
                            header="Aksi"
                            body={actionBodyTemplate}
                            style={{ textAlign: "center", width: "8rem" }}
                        />
                        </DataTable>
                    </div>
                </div>
            </div>


            {/* modal tambah */}
            {showTambah && <Tambah setShowTambah={setShowTambah} getPeminjaman={getPeminjaman} />}

            {/* modal Edit */}
            {showEdit && selectedPeminjaman && (
                <Edit
                    id_peminjaman={selectedPeminjaman.id_peminjaman}
                    dataPeminjaman={selectedPeminjaman}
                    setShowEdit={setShowEdit}
                    getPeminjaman={getPeminjaman}
                />
            )}

            {/* modal hapus */}
            {showHapus && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs"></div>
                    <div className="relative bg-white text-black rounded-xl p-6 shadow-2xl max-w-sm w-full animate__animated animate__zoomIn">
                        <p className="text-lg font-bold mb-4 text-center">
                            Apa kamu yakin ingin menghapus data ini?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDelete}
                                className="px-8 py-2 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-lg transition"
                            >
                                Ya
                            </button>
                            <button
                                onClick={() => {
                                    setShowHapus(false);
                                    setSelectedId(null);
                                }}
                                className="px-8 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Peminjaman;