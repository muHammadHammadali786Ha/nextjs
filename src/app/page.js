import Card from "@/components/Card";
// import { AuthContext } from "@/context/store"



const Home = () => {


  return (
    <>
      
      <div className="min-h-screen flex flex-col gap-8">
        <div className="w-full mt-16 gap-4 flex flex-col items-center">
          <div>
            <h1 className="text-4xl text-green-500 font-bold">Get you Dream...</h1>
          </div>
          <div className="w-1/2 bg-white border-[0.2rem] border-green-500 flex justify-between items-center py-2 px-4 rounded-full focus:outline-lime-500">
            <input type="text" className="w-full py-1 px-4 outline-none" placeholder="Search here" />
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg> */}

          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-center text-3xl text-green-500 font-bold">Internship available</h2>
          </div>
          <div>
          <Card />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
