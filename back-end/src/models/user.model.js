import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        Name: {
            type: String,
            required: true,
            minLength: 1,
            trim: true
        },
        Email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            minLength: 1,
            maxLength: 50,
            trim: true
        },
        Password: {
            type: String,
            required: true,
            minLength: 8,
            trim: true
        },
        Phone: {
            type: String,
            maxLength: 13,
            minLength: 10,
            required: true,
            trim: true

        }
    },
    {
        timestamps: true
    }
)
userSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return;

    this.Password = await bcrypt.hash(this.Password, 10);
});
userSchema.methods.comparePassword = async function (Password) {
    return await bcrypt.compare(Password, this.Password)
}
export const User = mongoose.model("User", userSchema);