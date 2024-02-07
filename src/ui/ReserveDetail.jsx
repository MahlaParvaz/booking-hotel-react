function ReserveDetail({ currentReserve }) {
  const startDate = new Date(currentReserve.formattedStartDate);
  const endDate = new Date(currentReserve.formattedEndDate);
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <div className="reservation-info  ">
      <div className="grid laptop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-5">
        <div>
          <span className="font-semibold text-[15px]">Move in:</span>
          <span className="ml-3"> {currentReserve.formattedStartDate}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]">Move out:</span>
          <span className="ml-3"> {currentReserve.formattedEndDate}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]">Number of guests:</span>
          <span className="ml-3"> {currentReserve.numberOfGuests}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]">Costs:</span>
          <span className="ml-3">$ {currentReserve.totalCost}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]">Days:</span>
          <span className="ml-3"> {totalDays}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]">Reserve code: </span>
          <span className="ml-4">{currentReserve.hotelId}</span>
        </div>
      </div>
    </div>
  );
}

export default ReserveDetail;
