import axios, {AxiosError} from "axios";
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Sidebar from '../komponen/Sidebar';
import { useEffect, useState} from "react";
import Tambah from "../komponen/TambahAnggota.tsx";
import Edit from "../komponen/editAnggota.tsx";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

interface Anggota {
  idKey: number;
  id_anggota: string;
  nama: string;
  jk: string;
  kelas: string;
  no_telp: string;
}





function DataAnggota() {
    const [anggota, setAnggota] = useState<Anggota[]>([]);
    const [showTambah, setShowTambah] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showHapus, setShowHapus] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedAnggota, setSelectedAnggota] = useState<Anggota | null>(null);
    const [globalFilter, setGlobalFilter] = useState<string>("");

    const getAnggota = () => {
      axios
        .get("http://127.0.0.1:8000/api/anggota")
        .then((res) => setAnggota(res.data.data))
        .catch((err) => {
          console.error("Gagal ambil data anggota:", err);
        });
    };
  
    useEffect(() => {
      getAnggota();
    }, []);


    const handleDelete = async () => {
      if (!selectedId) return;
    
      try {
        // panggil API Laravel
        await axios.delete(`http://localhost:8000/api/anggota/${selectedId}`);
    
        // kalau sukses, tutup modal dan refresh data
        setShowHapus(false);
        setSelectedId(null);
        getAnggota(); // fungsi untuk ambil ulang data dari API
      } catch (err) {
        const error = err as AxiosError<{ [key: string]: string[] }>;
        console.error("Gagal menghapus anggota:", error.message);
        console.log("Detail error dari Laravel:", error.response?.data);
      }
    };

    //aksi edit + hapus
    const actionBodyTemplate = (rowData: Anggota) => (
      <div className="flex justify-center gap-2">
        <button
          onClick={() => {
            setSelectedId(rowData.idKey.toString());
            setSelectedAnggota(rowData);
            setShowEdit(true);
          }}
          className="p-2 bg-green-500 hover:bg-green-400 rounded-lg transition"
        >
          <FaEdit className="text-white text-base" />
        </button>
        <button
          onClick={() => {
            setSelectedId(rowData.idKey.toString());
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
      <div className="flex ">
        <div className="w-28 lg:w-72">
          <Sidebar/>
        </div>
        <div className=" flex-1 pt-2 mr-2 mb-6 lg:mr-8 rounded-2xl sm:pt-5 overflow-x-auto relative">
          
          <div className="bg-white p-6 mt-2.5 rounded-2xl shadow-2xl ">
            {/* Tombol & Judul */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-700">Daftar Anggota</h2>
              <button
                onClick={() => setShowTambah(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg transition"
              >
                <FaPlus /> Tambah
              </button>
            </div>

            <div className="flex justify-start mb-4">
              <span className="p-input-icon-left">
                <i className="pi pi-search !pl-3 text-gray-500" />
                <InputText
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Cari anggota..."
                  className="p-inputtext-sm w-64 !pl-8 "
                />
              </span>
            </div>

            {/* PrimeReact DataTable */}
            <DataTable
              value={anggota}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 20, 30]}
              className="p-datatable-sm"
              stripedRows
              scrollable
              breakpoint="960px"
              responsiveLayout="stack" 
              globalFilter={globalFilter}
              emptyMessage="Tidak ada data ditemukan."
            >
              <Column
                header="No"
                body={(_, options) => options.rowIndex + 1}
                style={{ width: "4rem", textAlign: "center" }}
              />
              <Column field="id_anggota" header="ID Anggota"></Column>
              <Column field="nama" header="Nama" sortable></Column>
              <Column field="jk" header="JK" sortable ></Column>
              <Column field="kelas" header="Kelas" sortable ></Column>
              <Column field="no_telp" header="No. Telp" ></Column>
              <Column 
                body={actionBodyTemplate} 
                header="Aksi" 
                className="!text-center" 
                style={{ minWidth: '8rem' }}>
              </Column>
            </DataTable>

            
          </div>
        </div>
      </div>

      {/* modal tambah */}
      {showTambah && (
        <Tambah 
          setShowTambah={setShowTambah} 
          getAnggota={getAnggota} 
        />
      )}

      {/* modal Edit */}
      {showEdit && selectedAnggota && (
        <Edit
          idKey={selectedAnggota.idKey}
          dataAnggota={selectedAnggota}
          setShowEdit={setShowEdit}
          getAnggota={getAnggota}
        />
      )}
      

      {/* modal hapus */}
      {showHapus && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background hitam blur */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs"></div>

          {/* Box Konfirmasi */}
          <div className="relative bg-white text-black  rounded-xl p-6 shadow-2xl max-w-sm w-full animate__animated animate__zoomIn">
            <p className="text-lg font-bold mb-4 text-center ">Apa kamu yakin ingin menghapus data ini?</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleDelete} 
                className="px-8 py-2 bg-red-500 hover:bg-red-400 
                text-white font-semibold rounded-lg transition"
              >
                Ya
              </button>
              <button 
                onClick={() => {
                  setShowHapus(false);
                  setSelectedId(null);
                }} 
                className="px-8 py-2 bg-gray-600 hover:bg-gray-500 
                  text-white font-semibold rounded-lg transition"
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

export default DataAnggota