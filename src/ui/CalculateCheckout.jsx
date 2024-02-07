function CalculateCheckout(date,options,price) {
  const numberOfGuests = options.adult + options.children;
  const startDate = date[0].startDate;
  const endDate = date[0].endDate;
  const numberOfDays = Math.ceil((endDate - startDate + 1) / (1000 * 60 * 60 * 24));
  const totalCost = numberOfDays * numberOfGuests * price;
  return totalCost;
}

export default CalculateCheckout;
