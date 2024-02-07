import Loader from './Loader';
import { IoCloseCircle } from 'react-icons/io5';
import { FaShield } from 'react-icons/fa6';
import { useHotels } from '../features/hotels/HotelResultProvider';

function PolicyDetail() {
  const { currentHotel } = useHotels();

  if (!currentHotel) {
    // Render a loading state or return null
    return <Loader />;
  }

  return (
    <div className=" w-[90%] mb-10">
      <h2 className="font-semibold laptop:text-[30px] mobile:text-[24px] text-center mb-8">
        Policy detail
      </h2>
      <div className="grid laptop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-4">
        <div className="w-72">
          <p className="font-semibold laptop:text-[19px] mobile:text-[18px] mb-5">
            House rules
          </p>
          <div className="flex flex-col mb-5 gap-2">
            {currentHotel.house_rules?.map((rules, index) => (
              <div
                key={index}
                className="flex items-start top-16 -text--dark-green gap-2"
              >
                <IoCloseCircle className="text-[18px] mt-0.5" />
                {rules}
              </div>
            ))}
          </div>
        </div>
        <div className="w-72">
          <p className="font-semibold laptop:text-[19px] mobile:text-[18px] mb-5">
            Cancellation policy
          </p>
          <div className="flex items-start top-16 -text--dark-green gap-2">
            <IoCloseCircle className="text-[20px] mt-0.2" />
            {currentHotel.cancellation_policy}
          </div>
        </div>
        <div className="w-72">
          <p className="font-semibold laptop:text-[19px] mobile:text-[18px] mb-5 ">
            Health & Safety
          </p>
          <div className="flex items-start top-16 -text--dark-green gap-2">
            <FaShield className="text-[20px] mt-0.2" />
            {currentHotel.health_safety}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PolicyDetail;
