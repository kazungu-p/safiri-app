import express from "express"
import cors from "cors";
import userRouter from "./routers/user.router.js";
import bookingRouter from "./routers/booking.router.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/bookings", bookingRouter);

export default app;