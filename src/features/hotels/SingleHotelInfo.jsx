import { Link } from 'react-router-dom';

import { FaUsers } from 'react-icons/fa6';
import CalculateCheckout from '../../ui/CalculateCheckout';
import { useSearchHotelsContext } from '../checkout/CheckoutProvider';
import RoomsOptionsItem from '../../common/RoomsOptionsItem';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import DatePicker from '../../common/DatePicker';

function SingleHotelInfo({ currentHotel }) {
  const { date, options, handleOptions, numberOfGuests, totalCost } =
    useSearchHotelsContext();
  const state = {
    date,
    numberOfGuests,
    totalCost,
  };

  return (
    <div className="flex flex-col w-full  items-center   ">
      <div className="laptop:flex laptop:w-[80%] laptop:justify-between laptop:items-center  mobile:grid mobile:grid-cols-1 mobile:mt-[10px]  laptop:mt-0 gap-4 tablet:flex  tablet:mt-0   mb-20 tablet:w-[700px]">
        <div className="laptop:w-[600px]  h-full  mobile:w-[380px] tablet:ml-2  ">
          <img
            className="laptop:w-full mobile:w-[350px] laptop:h-[400px] tablet:w-full  tablet:h-[300px]  mobile:h-[270px] tablet:mt-9 laptop:mt-0 object-cover  rounded-xl mb-10"
            src={currentHotel.picture_url.url}
            alt={currentHotel.name}
          />
          <h2 className="mb-2 text-base mt-5 tablet:ml-2">
            {currentHotel.name}
          </h2>
          <div className="mb-10 tablet:ml-2">
            {currentHotel.number_of_reviews} reviews &bull;{' '}
            {currentHotel.smart_location}
          </div>
        </div>

        <div className=" -bg--light-gray laptop:w-[40%] mobile:w-[350px] rounded-3xl flex flex-col items-center justify-center p-8 mt-8">
          <h2 className="text-center mb-8 font-bold text-[18px]">
            Reservation bill
          </h2>
          <div className="flex cursor-pointer items-center relative h-12  laptop:w-80 mb-8 mobile:w-full bg-white  mobile:rounded-lg mobile:py-1  mobile:justify-center ">
            <DatePicker />
          </div>
          <div className=" mb-8 ">
            <div className="mobile:w-80  text-slate-500 mb-5 ml-4">
              <FaUsers className="header__icon  w-5 h-5 mobile:ml-2 " />
              <span>Number of guests : {numberOfGuests}</span>
            </div>
            <OptionsList options={options} handleOptions={handleOptions} />
          </div>

          <div className="flex flex-col gap-5 mb-8 w-full">
            <div className="flex justify-between px-3">
              <span>Price of one night:</span>
              <span>$ {currentHotel.price} </span>
            </div>
            <div className="flex justify-between px-3">
              <span>Total costs:</span>
              <span>
                $ {CalculateCheckout(date, options, currentHotel.price)}
              </span>
            </div>
          </div>
          <div className=" text-[14px]">
            <Link
              to={`/hotels-result/${currentHotel.id}/checkout`}
              state={state}
            >
              <div className="btn btn--primary w-56">Continue booking</div>
            </Link>
          </div>
          <span className="text-[14px] mt-4 laptop:text-start mobile:text-center">
            When you book this apartment, your reservation will be confirmed
            instantly
          </span>
        </div>
      </div>
      <div className=" w-[90%] mb-32">
        <h2 className="font-semibold text-[20px] mb-5">Description</h2>
        {currentHotel.description}
      </div>
    </div>
  );
}
export default SingleHotelInfo;

function OptionsList({ options, handleOptions }) {
  return (
    <div className="option-list gap-8 ml-4 rounded-lg laptop:w-96 mobile:w-[90%] ">
      <RoomsOptionsItem
        type="adult"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
      <RoomsOptionsItem
        type="children"
        options={options}
        minLimit={0}
        handleOptions={handleOptions}
      />
    </div>
  );
}
