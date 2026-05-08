import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null, // allow guest bookings
    },
    from: { type: String, required: true, trim: true },
    to: { type: String, required: true, trim: true },
    departureTime: { type: String, required: true },
    seatNumber: { type: Number, required: true },
    seatClass: { type: String, enum: ["economy", "business"], default: "economy" },
    passengerName: { type: String, required: true, trim: true },
    passengerPhone: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    mpesaRef: { type: String, default: null },
    travelDate: { type: String, required: true },
  },
  { timestamps: true }
);

const bookingModel =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default bookingModel;
