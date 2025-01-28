// Simulate 10 rooms in the hotel
module.exports = Array.from({ length: 10 }, (_, i) => ({
    roomNumber: i + 1,
    isBooked: false
  }));
  