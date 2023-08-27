const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@reactgram.pwp1hmn.mongodb.net/?retryWrites=true&w=majority`
    );

    console.log("MongoDB connected successfully");
    return dbConn;
  } catch (error) {
    console.log("Error to connecting to MongoDB:", error);
  }
};

conn();
module.exports = conn;
