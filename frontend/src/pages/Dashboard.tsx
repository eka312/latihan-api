import Sidebar from "../komponen/Sidebar"



function Dashboard() {
  


  return (
    <>
      <div className="flex">
        <div className="w-28 sm:w-72">
          <Sidebar/>
        </div>
      
      
        <div className=" pt-2 sm:pt-5 relative"  >
          <header>
            <h3 className="font-bold text-[18px] sm:text-2xl " >Selamat Datang, Pengguna!</h3>
            <p className="text-gray-400 " ></p>
          </header>

          <div className="grid mt-8 grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            <div className="bg-gray-700 p-5 flex-1 rounded-2xl relative h-30 w-50 sm:min-h-40 sm:w-80 ">
              <h4 className="absolute top-4 left-5  font-bold text-[16px] sm:text-xl  "></h4>
              <p className="absolute bottom-3 right-5 font-black text-5xl sm:text-6xl "></p>
            </div>
            <div className="bg-gray-700 p-5 flex-1 rounded-2xl relative h-30 w-50 sm:min-h-40 sm:w-80 ">
              <h4 className="absolute top-4 left-5  font-bold text-[16px] sm:text-xl  "></h4>
              <p className="absolute bottom-3 right-5 font-black text-5xl sm:text-6xl "></p>
            </div>
            <div className="bg-gray-700 p-5 flex-1 rounded-2xl relative h-30 w-50 sm:min-h-40 sm:w-80 ">
              <h4 className="absolute top-4 left-5  font-bold text-[16px] sm:text-xl  "></h4>
              <p className="absolute bottom-3 right-5 font-black text-5xl sm:text-6xl "></p>
            </div>
          </div>
          




        </div>
      </div>
    </>
      
  )
}

export default Dashboard