
import mongoose from "mongoose";

const connectDb = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res)
    }
    mongoose.set("strictQuery", false);
//    mongoose.connect(process.env.MONGO_URL, () => {
//         console.log("Connected to MongoDB");
//     });
    await mongoose.connect("mongodb://localhost:27017/ecommerce")

    return handler(req, res);
}

export default connectDb;