import PopularLocation from '../PopularLocation/PopularLocation';
import NearLocation from '../NearLocation/NearLocation';
import Exprience from '../Exprience/Exprience';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="header ">
      <div className="landingImg  laptop:w-full bg-black w-full h-[600px] p-0 relative  flex  justify-center items-end ">
        <img
          className="laptop:h-[500px] laptop:w-[80%]  mobile:w-full mobile:h-[500px] "
          src="/src/assets/img/landing-3.png"
          alt=""
        />
      </div>
      {/*  */}
      <div className=" w-full mt-20 flex justify-center items-center  relative">
        <div className="w-[80%]  ">
          <img
            className="w-full"
            src="/src/assets/img/The future is flexible.png"
            alt="seaside image doesn't show"
          />
        </div>
        <div className="title w-[500px] flex flex-col absolute text-end top-10 items-start justify-start p-16 right-60 ">
          <h2 className="font-bold text-[20px] -text--dark-green mb-5 text-right">
            Lets booking your favourite hotel
          </h2>
          <span className=" text-start">
            Book your accommodation easily, We wish you have a nice and comfortable stay.
            <br />
            Lets start booking your hotel.
          </span>
        </div>
      </div>
      {/*  */}
      <PopularLocation />
      <NearLocation />
      {/*  */}
      <div className="image w-full flex justify-center items-center  relative">
        <div className="w-[90%]  ">
          <img
            className="w-full h-[500px] rounded-[80px]"
            src="/src/assets/img/the-anam.jpg"
            alt="seaside image doesn't show"
          />
        </div>
        <div className="title flex flex-col absolute text-end   items-start gap-6 p-16 left-28 -bg--light-green rounded-[30px] bg-opacity-70">
          <h2 className="font-bold text-[20px] -text--dark-green mb-10 text-right">
            Lets booking your favourite hotel
          </h2>
          <Link to="/hotels">
            <button className="  -bg--dark-green shadow-lg hover:opacity-80 hover:shadow-none px-4 py-2 w-[150px] h-10 rounded-full text-white text-sm">
              Start booking
            </button>
          </Link>
        </div>
      </div>
      {/*  */}
      <Exprience />
      <div></div>
    </div>
  );
}

export default HomePage;
