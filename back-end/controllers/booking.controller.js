import bookingModel from "../models/booking.model.js";

// POST /api/bookings/create
const createBooking = async (req, res) => {
  try {
    const {
      from, to, departureTime, seatNumber, seatClass,
      passengerName, passengerPhone, price, travelDate, user
    } = req.body;

    if (!from || !to || !departureTime || !seatNumber || !passengerName || !passengerPhone || !price || !travelDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check seat isn't already booked for this route/time/date
    const conflict = await bookingModel.findOne({
      from, to, departureTime, seatNumber, travelDate,
      status: { $ne: "cancelled" },
    });
    if (conflict) {
      return res.status(409).json({ message: "That seat is already booked" });
    }

    const booking = await bookingModel.create({
      from, to, departureTime, seatNumber, seatClass,
      passengerName, passengerPhone, price, travelDate,
      user: user || null,
    });

    return res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    return res.status(500).json({ message: "Error creating booking", error: error.message });
  }
};

// PATCH /api/bookings/:id/confirm  — simulate M-Pesa payment confirmation
const confirmBooking = async (req, res) => {
  try {
    const { mpesaRef } = req.body;
    const booking = await bookingModel.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "confirmed";
    booking.mpesaRef = mpesaRef || `MP-${Date.now()}`;
    await booking.save();

    return res.json({ message: "Payment confirmed", booking });
  } catch (error) {
    return res.status(500).json({ message: "Error confirming booking", error: error.message });
  }
};

// GET /api/bookings/taken?from=X&to=Y&departureTime=Z&travelDate=W
// Returns booked seat numbers so the front-end can grey them out
const getTakenSeats = async (req, res) => {
  try {
    const { from, to, departureTime, travelDate } = req.query;
    if (!from || !to || !departureTime || !travelDate) {
      return res.status(400).json({ message: "from, to, departureTime, and travelDate are required" });
    }

    const bookings = await bookingModel.find({
      from, to, departureTime, travelDate,
      status: { $ne: "cancelled" },
    }).select("seatNumber seatClass");

    return res.json({ takenSeats: bookings.map((b) => b.seatNumber) });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching seats", error: error.message });
  }
};

// GET /api/bookings — admin: list all bookings
const listBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find({}).sort({ createdAt: -1 });
    return res.json({ count: bookings.length, bookings });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

// DELETE /api/bookings/:id
const cancelBooking = async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "cancelled";
    await booking.save();
    return res.json({ message: "Booking cancelled" });
  } catch (error) {
    return res.status(500).json({ message: "Error cancelling booking", error: error.message });
  }
};

export { createBooking, confirmBooking, getTakenSeats, listBookings, cancelBooking };
