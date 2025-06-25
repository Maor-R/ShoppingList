import mongoose from 'mongoose';
import {DB_NAME} from "../constants/constants.js";

const connectDB = async () => {
  try {

    
    mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", () => console.log("error connecting to database"));

db.once("open", () => console.log("Connected to database"));

    // const conn = await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   dbName: DB_NAME,
    // });
    // console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
  } 
  catch (err) {
    console.log(`${err}`.red);
  }
};

export default connectDB;