import { Link } from 'react-router-dom';
import Loader from '../../ui/Loader';
import useFetchData from '../../Hooks/useFetchData';
import { useAuth } from '../authentication/AuthProvider';

function AllReserves() {
  const { data, isLoading, error } = useFetchData(
    'http://localhost:5000/reserves',
    ''
  );
  const today = new Date();
  const { user } = useAuth();

  if (error) return <div>Error loading data: {error.message}</div>;

  const filteredReservations = data?.filter(
    (item) =>
      item?.firstname &&
      item?.email !== user?.username &&
      user?.email &&
      (item.username?.toLowerCase().includes(user?.username?.toLowerCase()) ||
        item.email?.toLowerCase().includes(user?.email?.toLowerCase()))
  );
  return (
    <div className="reservation">
      <h2 className="app-title">Reserves</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="reservationList laptop:w-[80%] tablet:w-[100%] py-4 px-10">
          {filteredReservations.length === 0 ? (
            <p>You don't have any reservations yet.</p>
          ) : (
            filteredReservations.map((item) => (
              <Link
                key={item.id}
                to={`/hotels-result/${item.id}/checkout/payment/active-reserves/reserves-info`}
                className="reservation__card"
              >
                <img
                  className="reservation__img"
                  src={item.hotelImage}
                  alt="hotel image"
                />

                <div className="reservation__content">
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
                  {new Date(item.formattedEndDate).getTime() <
                    today.getTime() &&
                  new Date(item.formattedEndDate).getTime() > today.getTime()
                    ? 'Finished'
                    : 'Active'}
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AllReserves;
