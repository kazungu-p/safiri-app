import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

const registerUser = async(req, res) =>{
    try {
        const {name, email, password} =req.body;
        if(!name || !email || !password){
           return res.json({message: "All fields are required"})
        }
        const existingUser = await userModel.findOne({email: email.toLowerCase()})
        if (existingUser){
            return res.json({message: "User already exists! proceed to log in"});
        }
        const user = await userModel.create({
            name,
            email: email.toLowerCase(),
            password
        })
        res.json({
            message: "User successfully registered",
            user:{id:user._id, email:user.email}
        })
    } catch (error) {
        res.status(500).json({message: "internal server. error", error: error.message})
    }
}
export {registerUser}