import { User } from "../models/user.model.js";

const registerUser = async(req, res) =>{
    try {
        const {Name, Email, Password, Phone} =req.body;

        if(!Name || !Email || !Password || !Phone){

            return res.status(400).json({message: "All fields are required!"})
        }

        const existing = await User.findOne({Email : Email.toLowerCase()});

        if (existing){
            return res.status(400).json({message: "User already exists proceed to log in"})
        }

        const user = await User.create({
            Name,
            Email: Email.toLowerCase(),
            Password,
            Phone,
            loggedIn: false
        });

        res.status(201).json({message: "User has been created successfully!",
            user: {
                id: user._id,
                Name: user.Name,
                Email: user.Email,
                Phone: user.Phone,
            },
        });
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

const loginUser = async(req, res)=>{
    try {
        const {Email, Password} =req.body;

        const user = await User.findOne({Email : Email.toLowerCase()});

        if (!user){
            return res.status(400).json({message: "User does not exist"})
        }

        const passwordMatch = await user.comparePassword(Password);
        if (!passwordMatch) return res.status(400).json({message: "username or password is incorrect"});

        res.status(200).json({
            message: "Logged in successfully",
            user: {
                id: user._id,
                Email: user.Email
            }
        })
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message})
    }
}
export{
    registerUser,
    loginUser
};