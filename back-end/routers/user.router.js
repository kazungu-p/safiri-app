import express from "express"
import { deleteUser, listUsers, loginUser, registerUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/getusers",listUsers)
userRouter.delete("/deleteuser/:id", deleteUser)
export default userRouter;