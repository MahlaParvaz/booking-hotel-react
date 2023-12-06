import { useForm } from 'react-hook-form';
import Select from 'react-select';
import Input from '../../common/Input';
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: '350px',
    borderRadius: '0.75rem',
    borderColor: state.isFocused ? '#F2F0F2' : provided.borderColor,
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    // const { name, username, email, password, confirmPassword, terms } = values;
    console.log('submit');
  };
  return (
    <div className="  flex  w-full  items-center justify-center ">
      <div className="  w-[85%] rounded-3xl flex flex-col items-center justify-start p-8 mb-6 mr-20">
        <h2 className="text-center font-semibold text-[20px] mb-6">Payment detail</h2>
        <form
          className="w-full flex flex-col gap-4 mb-10 items-center"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Input
            label="First Name"
            name="first name"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            label="Last Name"
            name="last name"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            label="Phone Number"
            name="phone number"
            type="number"
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
          <div className='flex flex-col '>
            <p className='mb-2'>Payment by</p>
            <Select options={options} styles={customStyles} />
          </div>
        </form>
        <button>
          <div className="-bg--dark-green text-white w-[350px] p-2 text-center rounded-2xl hover:-bg--light-green hover:-text--dark-green">
            Pay now
          </div>
        </button>
      </div>
    </div>
  );
}

export default Payment;
