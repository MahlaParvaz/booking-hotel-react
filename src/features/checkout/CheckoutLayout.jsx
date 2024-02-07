import { Outlet } from 'react-router-dom';
import BookingInfo from '../../ui/BookingInfo';

function CheckoutLayout() {
  return (
    <div className=" flex  w-full  items-center justify-center ">
      <div className="checkout-layout">
        <BookingInfo />
        <Outlet />
      </div>
    </div>
  );
}
export default CheckoutLayout;
