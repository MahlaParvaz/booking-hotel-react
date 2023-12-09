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
    <div className="reservation mb-10 w-full  p-0 h-full flex flex-col  justify-center items-center gap-6 ">
      <h2 className="laptop:w-[80%] px-4  text-lg font-bold mt-24 ">Reserves</h2>
      <div className="reservationList w-[80%]  py-4 px-10   ">
        {data.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/hotels-result/${item.id}/checkout/payment/active-reserves/reserves-info`}
              className="flex justify-between items-center -bg--light-gray w-full h-36 rounded-3xl mb-10"
            >
              <div>
                <img
                  className="w-56 h-36 object-cover rounded-tl-3xl rounded-br-3xl"
                  src={item.hotelImage}
                  alt="hotel image doesn't show"
                />
              </div>
              <div className="h-full  flex justify-between items-center w-[55%]">
                <div>
                  <p className="font-semibold mb-4">City name:</p>
                  <p>{item.hotelName}</p>
                </div>
                <div>
                  <p className="font-semibold mb-4">Move in:</p>
                  <p>{item.formattedStartDate}</p>
                </div>
                <div>
                  <p className="font-semibold mb-4">Move out:</p>
                  <p>{item.formattedEndDate}</p>
                </div>
              </div>
              <div className="mr-10 w-[10%] h-full flex flex-col justify-center">
                <p className="font-semibold mb-4">status:</p>
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
