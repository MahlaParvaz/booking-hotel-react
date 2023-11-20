function PopularLocation() {
  return (
    <div className="popularLocations  w-full h-[450px] mb-10 p-0 relative flex flex-col  justify-center items-center gap-6">
      <h2 className="laptop:w-[85%] px-4  text-lg font-bold">Popular Locations</h2>
      <div className=" flex gap-6 h-[300px]">
        <div className="location bg-red-700 shadow-xl  rounded-lg flex flex-col items-center  gap-2 cursor-pointer hover:opacity-80 ">
          <img
            className="w-[300px] h-[230px] rounded-lg"
            src="/src/assets/img/london.jpg"
            alt="london doesn't show"
          />
          <div className="description text-white ">
            <p>London</p>
            <p>a city with historic bulding </p>
          </div>
        </div>
        <div className="location bg-green-600  shadow-xl  rounded-lg flex flex-col items-center  gap-2 cursor-pointer hover:opacity-80 ">
          <img
            className="w-[300px] h-[230px] rounded-lg"
            src="/src/assets/img/paris-2.jpg"
            alt="paris doesn't show"
          />
          <div className="description text-white ">
            <p>Paris</p>
            <p>a city ​​of lovers </p>
          </div>
        </div>
        <div className="location bg-yellow-600 shadow-xl  rounded-lg flex flex-col items-center  gap-2 cursor-pointer hover:opacity-80 ">
          <img
            className="w-[300px] h-[230px] rounded-lg"
            src="/src/assets/img/america.png"
            alt="america doesn't show"
          />
          <div className="description text-white ">
            <p>America</p>
            <p>a city with modern building </p>
          </div>
        </div>
        <div className="location bg-violet-700 shadow-xl  rounded-lg flex flex-col items-center  gap-2 cursor-pointer hover:opacity-80 ">
          <img
            className="w-[300px] h-[230px] rounded-lg"
            src="/src/assets/img/africa.jpg"
            alt="africa doesn't show"
          />
          <div className="description text-white ">
            <p>Africa</p>
            <p>a city with beautiful nature </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularLocation;
