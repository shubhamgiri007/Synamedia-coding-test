exports.isValidDateRange = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    return checkInDate < checkOutDate && checkInDate >= new Date();
  };
  