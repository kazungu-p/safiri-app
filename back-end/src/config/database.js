import mongoose from "mongoose"

const connectDB = async() => {
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
       console.log(`Database connection established successfully! ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Database connection could not be established!", error)
        process.exit(1)
    }
}
export default connectDB;