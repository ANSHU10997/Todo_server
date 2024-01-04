const mongoose = require("mongoose");

const Connection = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(
    "mongodb+srv://anshu:Ak4190401@cluster0.ztvdhoc.mongodb.net/userappnew",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  mongoose.connection.on("connected", () => {
    console.log("Database Connected Successfully");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Database Disonnected ");
  });
  mongoose.connection.on("error", () => {
    console.log("Error in Connecting to Dataase");
  });
};

module.exports = Connection;
