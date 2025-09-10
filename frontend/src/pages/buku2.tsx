import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Sidebar from "../komponen/Sidebar";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Tambah from "../komponen/Tambah";
import Edit from "../komponen/edit";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

interface Buku {
    id_buku: number;
    judul: string;
    pengarang: string;
    penerbit: string;
    tahun_terbit: number;
    kategori: string;
    jumlah: number;
}

export default function DataBuku() {
    const [buku, setBuku] = useState<Buku[]>([]);
    const [showTambah, setShowTambah] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showHapus, setShowHapus] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedBuku, setSelectedBuku] = useState<Buku | null>(null);
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const token = localStorage.getItem("token");
    
    const getBuku = () => {
        axios
        .get("http://127.0.0.1:8000/api/buku", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        })
        .then((res) => {
            console.log("Respon API Buku:", res.data); 
            setBuku(res.data.data); 
        })
        .catch((err) => console.error("Gagal ambil data buku:", err));
    };

    useEffect(() => {
        getBuku();
    }, []);

    const handleDelete = async () => {
        if (!selectedId) return;
        try {
            await axios.delete(`http://localhost:8000/api/buku/${selectedId}`);
            setShowHapus(false);
            setSelectedId(null);
            getBuku();
        } catch (err) {
            const error = err as AxiosError<{ [key: string]: string[] }>;
            console.error("Gagal menghapus buku:", error.message);
        }
    };

    // tombol aksi edit + hapus
    const actionBodyTemplate = (rowData: Buku) => (
        <div className="flex justify-center gap-2">
            <button
                onClick={() => {
                    setSelectedId(rowData.id_buku.toString());
                    setSelectedBuku(rowData);
                    setShowEdit(true);
                }}
                className="p-2 bg-green-500 hover:bg-green-400 rounded-lg transition"
            >
                <FaEdit className="text-white text-base" />
            </button>
            <button
                onClick={() => {
                    setSelectedId(rowData.id_buku.toString());
                    setShowHapus(true);
                }}
                className="p-2 bg-red-500 hover:bg-red-400 rounded-lg transition"
            >
                <FaTrash className="text-white text-base" />
            </button>
        </div>
    );

    return (
        <>
        <div className="flex min-h-screen ">
            <div className="w-15 lg:w-58 ">
                <Sidebar />
            </div>
            <div className="flex-1 m-4 md:m-6 pb-7  rounded-2xl overflow-x-auto relative">
                <div className="bg-white p-6 mt-2.5 border-2 border-gray-300 rounded-2xl shadow-lg ">
                    {/* Tombol & Judul */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-700">Daftar Buku</h2>
                        <button
                            onClick={() => setShowTambah(true)}
                            className="flex items-center gap-2 mr-1 sm:mr-0 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg transition"
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
                        value={buku}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 20, 30]}
                        stripedRows
                        scrollable
                        breakpoint="960px"
                        responsiveLayout="stack" 
                        globalFilter={globalFilter}
                        className="text-sm"
                        emptyMessage="Tidak ada data ditemukan."
                    >
                    <Column
                        header="No"
                        body={(_, options) => options.rowIndex + 1}
                        style={{ width: "4rem", textAlign: "center" }}
                    />
                    <Column field="judul" header="Judul" sortable />
                    <Column field="pengarang" header="Pengarang" sortable />
                    <Column field="penerbit" header="Penerbit" />
                    <Column field="tahun_terbit" header="Tahun" />
                    <Column field="kategori" header="Kategori" />
                    <Column field="jumlah" header="Jumlah" />
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
        {showTambah && <Tambah setShowTambah={setShowTambah} getBuku={getBuku} />}

        {/* modal Edit */}
        {showEdit && selectedBuku && (
            <Edit
                idBuku={selectedBuku.id_buku}
                dataBuku={selectedBuku}
                setShowEdit={setShowEdit}
                getBuku={getBuku}
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
    );
}
