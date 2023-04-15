import mongoose from "mongoose";

// shortcut to mongoose.connection object
const db = mongoose.connection

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
  })
  .catch((err) => {
    console.log(err);
  });




