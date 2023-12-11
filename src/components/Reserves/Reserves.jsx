import { useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import useFetch from '../../Hooks/useFetch';

function Reserves() {
  const { data, isLoading, error } = useFetch('http://localhost:5000/reserves', '');
  const today = new Date();
  if (isLoading) return <Loader />;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div className="reservation mb-10 w-full  p-0 h-full flex flex-col  justify-center items-center gap-6    ">
      <h2 className="laptop:w-[80%] tablet:w-[85%] mobile:w-[80%] px-4  text-lg font-bold laptop:mt-24 tablet:mt-24 mobile:mt-[22rem] ">
        Reserves
      </h2>
      <div className="reservationList laptop:w-[80%] tablet:w-[100%] py-4 px-10 ">
        {data.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/hotels-result/${item.id}/checkout/payment/active-reserves/reserves-info`}
              className="flex laptop:flex-row tablet:flex-row mobile:flex-col  mobile:items-start mobile:justify-between mobile:gap-y-5 justify-between items-center -bg--light-gray w-full laptop:h-36 tablet:h-36 mobile:h-full rounded-3xl mb-10"
            >
              <div>
                <img
                  className="laptop:w-56 laptop:h-36 tablet:w-40 tablet:h-36  mobile:w-full object-cover rounded-tl-3xl rounded-br-3xl"
                  src={item.hotelImage}
                  alt="hotel image doesn't show"
                />
              </div>
              <div className="h-full  flex laptop:flex-row tablet:flex-row laptop:items-center tablet:items-center mobile:flex-col mobile:items-start mobile:gap-y-5 mobile:px-4 justify-between items-center  laptop:w-[55%] tablet:w-[75%] ">
                <div>
                  <p className="font-semibold mb-4 tablet:text-[16px] laptop:text-[17px] mobile:text-[16px]">
                    City name:
                  </p>
                  <p className="tablet:text-[14px] mobile:text-[14px]  laptop:text-[16px]">
                    {item.hotelName}
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-4 tablet:text-[16px] laptop:text-[17px] mobile:text-[16px]">
                    Move in:
                  </p>
                  <p className="tablet:text-[14px] mobile:text-[14px]  laptop:text-[16px]">
                    {item.formattedStartDate}
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-4 tablet:text-[16px] laptop:text-[17px] mobile:text-[16px]">
                    Move out:
                  </p>
                  <p className="tablet:text-[14px] mobile:text-[14px]  laptop:text-[16px]">
                    {item.formattedEndDate}
                  </p>
                </div>
              </div>
              <div className="laotop:mr-10 tablet:mr-10 w-[9%] h-full flex flex-col justify-center mobile:px-4 mobile:mb-5">
                <p className="font-semibold mb-4 tablet:text-[16px] laptop:text-[17px]">
                  status:
                </p>
                {new Date(item.formattedEndDate).getTime() < today.getTime()
                  ? 'Finished'
                  : 'Active'}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Reserves;
