const { bookRoom, getBookingByEmail, getAllGuests, cancelBooking, modifyBooking } = require('../models/bookingModel');

// Book a room
exports.bookRoom = (req, res) => {
  const { name, email, contact, checkIn, checkOut } = req.body;
  const booking = bookRoom(name, email, contact, checkIn, checkOut);
  if (booking.error) return res.status(400).json({ error: booking.error });
  res.status(201).json(booking);
};

// View booking details
exports.getBookingDetails = (req, res) => {
  const { email } = req.query;
  const booking = getBookingByEmail(email);
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  res.status(200).json(booking);
};

// View all guests
exports.getAllGuests = (req, res) => {
  const guests = getAllGuests();
  res.status(200).json(guests);
};

// Cancel a booking
exports.cancelBooking = (req, res) => {
  const { email, roomNumber } = req.body;
  const result = cancelBooking(email, roomNumber);
  if (!result) return res.status(404).json({ error: 'Booking not found or invalid room' });
  res.status(200).json({ message: 'Booking canceled successfully' });
};

// Modify booking
exports.modifyBooking = (req, res) => {
  const { email, roomNumber, newCheckIn, newCheckOut } = req.body;
  const result = modifyBooking(email, roomNumber, newCheckIn, newCheckOut);
  if (result.error) return res.status(400).json({ error: result.error });
  res.status(200).json(result);
};
