import { Link } from 'react-router-dom';

function BookAdvertisement() {
  return (
    <div className=" w-full mobile:mb-20  flex justify-center items-center  relative">
      <div className="laptop:w-[90%] mobile:w-full ">
        <img
          className="w-full h-[450px] laptop:rounded-[80px] mobile:rounded-none object-cover"
          src="/img/the-anam.jpg"
          alt="seaside image doesn't show"
        />
      </div>
      <div className="advertisement__desc">
        <h2 className="advertisement__title ">
          Lets booking your favourite hotel
        </h2>
        <Link to="/hotels">
          <button className="advertisement__btn ">
            Start booking
          </button>
        </Link>
      </div>
    </div>
  );
}
export default BookAdvertisement;
