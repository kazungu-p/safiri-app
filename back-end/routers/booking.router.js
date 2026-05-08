import express from "express";
import {
  createBooking,
  confirmBooking,
  getTakenSeats,
  listBookings,
  cancelBooking,
} from "../controllers/booking.controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/create", createBooking);
bookingRouter.patch("/:id/confirm", confirmBooking);
bookingRouter.get("/taken", getTakenSeats);
bookingRouter.get("/", listBookings);
bookingRouter.patch("/:id/cancel", cancelBooking);

export default bookingRouter;
