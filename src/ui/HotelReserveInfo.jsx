function HotelReserveInfo({ currentHotel }) {
  return (
    <div className="reservation-info  ">
      <h2 className=" font-semibold mb-10 text-[20px]">Hotel Information:</h2>
      <div className="grid laptop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-6">
        <div>
          <span className="font-semibold text-[15px]">City name:</span>
          <span className="ml-3">{currentHotel.name}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]"> Rooms:</span>
          <span className="ml-3">{currentHotel.accommodates}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]"> Beds:</span>
          <span className="ml-3">{currentHotel.beds}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]"> Bathrooms:</span>
          <span className="ml-3">{currentHotel.bathrooms}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]"> Bedrooms:</span>
          <span className="ml-3">{currentHotel.bedrooms}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]">Hotel location:</span>
          <span className="ml-3">{currentHotel.smart_location}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]">Host name:</span>
          <span className="ml-3">{currentHotel.host_name}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]">Host email:</span>
          <span className="ml-3">{currentHotel.host_email}</span>
        </div>
      </div>
    </div>
  );
}
export default HotelReserveInfo;
