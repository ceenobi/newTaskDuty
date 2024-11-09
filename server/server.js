import app from "./app.js";
import { connectToDb } from "./config/connectToDb.js";

const PORT = process.env.PORT || 4000;

if (!PORT) {
  throw new Error("Please ensure there is a port number assigned");
}

// Connect to MongoDB
connectToDb()
  .then(() => startServer())
  .catch((error) => {
    console.error("Invalid datatabse connection");
  });

function startServer() {
  app.listen(PORT, (error) => {
    if (error) {
      console.log("Cannot connect to server", error);
    } else {
      console.log(`Server is connected to port ${PORT}`);
    }
  });
}
