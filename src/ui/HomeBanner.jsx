function HomeBanner() {
  return (
    <div className="mobile:hidden tablet:flex laptop:flex w-full mb-12 mt-20 flex justify-center items-center  relative">
      <div className="laptop:w-[80%] tablet:w-[90%]  ">
        <img
          className="w-full tablet:h-[300px] laptop:h-full"
          src="/img/The future is flexible 1.svg"
          alt="seaside image doesn't show"
        />
      </div>
      <div className=" bannerText ">
        <h2 className="font-bold text-[20px] -text--dark-green tablet:w-[300px] laptop:w-full  mb-5 tablet:text-left laptop:text-start">
          Lets booking your favourite hotel
        </h2>
        <span className=" text-start">
          Book your accommodation easily, We wish you have a nice and
          comfortable stay.
          <br />
          Lets start booking your hotel.
        </span>
      </div>
    </div>
  );
}
export default HomeBanner;
