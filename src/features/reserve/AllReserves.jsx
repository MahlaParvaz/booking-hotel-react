import { Link } from 'react-router-dom';
import Loader from '../../ui/Loader';
import useFetch from '../../hooks/useFetch';

function AllReserves() {
  const { data, isLoading, error } = useFetch(
    'http://localhost:5000/reserves',
    ''
  );
  const today = new Date();
  if (isLoading) return <Loader />;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div className="reservation    ">
      <h2 className="app-title   ">Reserves</h2>
      <div className="reservationList laptop:w-[80%] tablet:w-[100%] py-4 px-10 ">
        {data.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/hotels-result/${item.id}/checkout/payment/active-reserves/reserves-info`}
              className="reservation__card "
            >
              <div>
                <img
                  className="reservation__img "
                  src={item.hotelImage}
                  alt="hotel image doesn't show"
                />
              </div>
              <div className="reservation__content  ">
                <div>
                  <p className="content__title">City name:</p>
                  <p className="content__detail">{item.hotelName}</p>
                </div>
                <div>
                  <p className="content__title">Move in:</p>
                  <p className="content__detail">{item.formattedStartDate}</p>
                </div>
                <div>
                  <p className="content__title">Move out:</p>
                  <p className="content__detail">{item.formattedEndDate}</p>
                </div>
              </div>
              <div className="content__status">
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

export default AllReserves;