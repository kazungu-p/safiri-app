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
        return res.status(500).json({message: "internal server. error", error: error.message})
    }
}
const loginUser = async(req, res) =>{
    try {
        const {email, password} =req.body

        const user = await userModel.findOne({email: email.toLowerCase()});
        if (!user){
            res.json({message: "user does not exist"})
        }
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.json({message: "password is incorrect"})
        }
        return res.json({message: "user logged in",
            email: user.email,
            id: user._id
        })
    } catch (error) {
        return res.json({message: "error fetching users", error: error.message})
    }
}
const listUsers = async(req, res) =>{
    try {
        const users = await userModel.find({})
        .select('-password')
        return res.json({
            count: users.length,
            users
        })
    } catch (error) {
       return res.json({message: "error fetching users"})
    }
}
const deleteUser =async(req, res) =>{
    try {
        const user = await userModel.findById(req.params.id)
        if(!user){
           return res.json({message: "could not find user"});
        }
        await userModel.findByIdAndDelete(req.params.id);
       return res.json({message: "User has successfully been deleted"})
        
    } catch (error) {
       return res.json({message: "could not delete user", error: error.message})
    }
}
export {registerUser, loginUser, listUsers, deleteUser}