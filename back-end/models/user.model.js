import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
            toLowerCase: true
        },
        email:{
            type: String,
            required: true,
            toLowerCase: true,
            unique: true,
            trim: true,
            minLength: 1,
            maxLength: 50
        },
        password:{
            type: String,
            required: true,
            trim: true,
            minLength: 8
        }
    }
    ,
    {
        timestamps: true
    }
)
const userModel = mongoose.models.User || mongoose.model("User", userSchema);

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default userModel;