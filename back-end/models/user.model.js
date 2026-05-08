import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        email:{
            type: String,
            required: true,
            lowercase: true,
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
userSchema.pre("save", async function() {
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;