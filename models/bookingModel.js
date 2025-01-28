const { v4: uuidv4 } = require('uuid');
const rooms = require('../data/rooms');
const { isValidDateRange } = require('../utils/validateDates');

const bookings = []; // In-memory database

// Book a room
exports.bookRoom = (name, email, contact, checkIn, checkOut) => {
  if (!isValidDateRange(checkIn, checkOut)) {
    return { error: 'Invalid date range' };
  }

  const availableRoom = rooms.find(room => !room.isBooked);
  if (!availableRoom) {
    return { error: 'No rooms available' };
  }

  availableRoom.isBooked = true;
  const booking = {
    id: uuidv4(),
    name,
    email,
    contact,
    checkIn,
    checkOut,
    roomNumber: availableRoom.roomNumber
  };
  bookings.push(booking);
  return booking;
};

// Get booking by email
exports.getBookingByEmail = (email) => bookings.find(booking => booking.email === email);

// Get all guests
exports.getAllGuests = () => bookings.map(({ name, roomNumber }) => ({ name, roomNumber }));

// Cancel a booking
exports.cancelBooking = (email, roomNumber) => {
  const bookingIndex = bookings.findIndex(
    booking => booking.email === email && booking.roomNumber === roomNumber
  );

  if (bookingIndex === -1) return false;

  const room = rooms.find(r => r.roomNumber === roomNumber);
  if (room) room.isBooked = false;

  bookings.splice(bookingIndex, 1);
  return true;
};

// Modify booking
exports.modifyBooking = (email, roomNumber, newCheckIn, newCheckOut) => {
  if (!isValidDateRange(newCheckIn, newCheckOut)) {
    return { error: 'Invalid date range' };
  }

  const booking = bookings.find(
    booking => booking.email === email && booking.roomNumber === roomNumber
  );

  if (!booking) {
    return { error: 'Booking not found' };
  }

  booking.checkIn = newCheckIn;
  booking.checkOut = newCheckOut;
  return booking;
};
