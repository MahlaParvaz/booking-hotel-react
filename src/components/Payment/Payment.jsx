import { useForm } from 'react-hook-form';
import Select from 'react-select';
import Input from '../../common/Input';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHotels } from '../context/HotelResultProvider';
import { useState } from 'react';
import { useReserveAuth } from '../context/ReserveAuth';
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: '350px',
    borderRadius: '0.75rem',
    boxShadow: 'none',
    border: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    width: '350px',
    backgroundColor: provided.isHovered ? 'white' : 'white',
  }),
};

const options = [
  { value: 'debit card', label: 'Debit card' },
  { value: 'credit card', label: 'Credit card' },
];
function Payment() {
  const location = useLocation();
  const { state } = location;
  const { reserves } = useReserveAuth();
  const navigate = useNavigate();
  const { currentHotel } = useHotels();
  const [isReserving, setReserving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  const onSubmit = async (values) => {
    const { firstname, lastname, phoneNumber, email, paymentBy } = values;

    const reservationData = {
      ...state,
      hotelId: currentHotel.id,
      hotelImage: currentHotel.picture_url.url,
      hotelName: currentHotel.name,
    };

    try {
      if (!paymentBy) {
        setError('paymentBy', {
          type: 'manual',
          message: 'Please select a payment method',
        });
        return;
      }
      reserves(firstname, lastname, phoneNumber, email, paymentBy, reservationData);
      setTimeout(() => location.reload(), 3000);
      toast.success('Reservation was successful');
      navigate(`/hotels-result/${currentHotel.id}/checkout/payment/active-reserves`);
    } catch (error) {
      console.error('Error during reservation:', error);

      if (error.response && error.response.data) {
        console.error('API Response:', error.response.data);
      }

      toast.error('Reservation was not successful');
    } finally {
      setReserving(false);
    }
  };

  return (
    <div className="  flex  w-full  items-center justify-center ">
      <div className="  laptop:w-[85%] mobile:w-[350px] tablet:w-[85%] rounded-3xl flex flex-col items-center justify-start p-8 laptop:-mt-2  mb-7 laptop:mr-20 mobile:m-0">
        <h2 className="text-center font-semibold text-[20px] mb-6">Payment detail</h2>
        <form
          className="laptop:w-full  flex flex-col gap-4  items-center"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Input
            label="First Name"
            name="firstname"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            label="Last Name"
            name="lastname"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            register={register}
            errors={errors}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            pattern={
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            }
            register={register}
            errors={errors}
          />
          <div className="flex flex-col ">
            <p className="mb-2">Payment by</p>
            <div className=" mt-1  border-solid border-[1px] border-slate-300 rounded-xl">
              <Select
                options={options}
                styles={customStyles}
                {...register('paymentBy', {
                  required: 'Payment is required',
                })}
                onChange={(selectedOption) => {
                  setValue('paymentBy', selectedOption);
                }}
              />
            </div>

            {errors.paymentBy && (
              <p className="error text-rose-500 text-[13px] font-semibold py-1 px-2">
                {errors.paymentBy.message || 'Payment is required'}
              </p>
            )}
          </div>

          <button className="mt-5 -bg--dark-green text-white w-[350px] p-2 text-center rounded-2xl hover:-bg--light-green hover:-text--dark-green">
            Pay now
          </button>
          <Toaster />
        </form>
      </div>
    </div>
  );
}

export default Payment;
