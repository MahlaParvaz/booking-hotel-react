const data = [
  {
    src: '/src/assets/img/city-iran.jpg',
    name: 'Iran',
  },
  {
    src: '/src/assets/img/city-london.jpg',
    name: 'London',
  },
  {
    src: '/src/assets/img/city-paris.jpg',
    name: 'Paris',
  },
  {
    src: '/src/assets/img/city-netherland.jpg',
    name: 'Netherland',
  },
  {
    src: '/src/assets/img/city-america.jpg',
    name: 'America',
  },
  {
    src: '/src/assets/img/city-africa.jpg',
    name: 'Africa',
  },
];

function PopularLocation() {
  return (
    <div className="popularLocations  w-full h-[450px] mb-10 p-0 relative flex flex-col  justify-center items-center gap-6">
      <h2 className="laptop:w-[85%] px-4  text-lg font-bold">Popular Locations</h2>
      <div className=" grid grid-cols-6  gap-6 h-[300px]">
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className="location   h-[250px]   flex flex-col-reverse items-start   gap-6 cursor-pointer  "
            >
              <img
                className="w-[195px] h-[200px] rounded-[40px] shadow-xl hover:shadow-none "
                src={item.src}
                alt="city doesn't show"
              />
              <div className="description text-black px-4 font-bold  ">
                <p>{item.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PopularLocation;

// //
// <div className="location -bg--dark-green shadow-xl  rounded-[30px] flex flex-col items-center  gap-2 cursor-pointer hover:opacity-80 ">
// <img
//   className="w-[230px] h-[230px] rounded-lg"
//   src="/src/assets/img/city-london.jpg"
//   alt="london doesn't show"
// />
// <div className="description text-white ">
//   <p>London</p>
//   <p>a city with historic bulding </p>
// </div>
// </div>
// <div className="location -bg--dark-green  shadow-xl  rounded-lg flex flex-col items-center  gap-2 cursor-pointer hover:opacity-80 ">
// <img
//   className="w-[230px] h-[230px] rounded-lg"
//   src="/src/assets/img/city-paris.jpg"
//   alt="paris doesn't show"
// />
// <div className="description text-white ">
//   <p>Paris</p>
//   <p>a city ​​of lovers </p>
// </div>
// </div>
// <div className="location bg-yellow-600 shadow-xl  rounded-lg flex flex-col items-center  gap-2 cursor-pointer hover:opacity-80 ">
// <img
//   className="w-[230px] h-[230px] rounded-lg"
//   src="/src/assets/img/city-america.jpg"
//   alt="america doesn't show"
// />
// <div className="description text-white ">
//   <p>America</p>
//   <p>a city with modern building </p>
// </div>
// </div>
// <div className="location bg-violet-700 shadow-xl  rounded-lg flex flex-col items-center  gap-2 cursor-pointer hover:opacity-80 ">
// <img
//   className="w-[230px] h-[230px] rounded-lg"
//   src="/src/assets/img/city-africa.jpg"
//   alt="africa doesn't show"
// />
// <div className="description text-white ">
//   <p>Africa</p>
//   <p>a city with beautiful nature </p>
// </div>
// </div>
// <div className="location bg-violet-700 shadow-xl  rounded-lg flex flex-col items-center  gap-2 cursor-pointer hover:opacity-80 ">
// <img
//   className="w-[230px] h-[230px] rounded-lg"
//   src="/src/assets/img/city-netherland.jpg"
//   alt="netherland doesn't show"
// />
// <div className="description text-white ">
//   <p>Africa</p>
//   <p>a city with beautiful nature </p>
// </div>
// </div>
