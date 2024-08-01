import express from "express";
import {} from "dotenv/config";
import connectDB from "./db/connect.mjs";
import cors from "cors";
import userRoute from "./routes/userRoute.mjs";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.send("<h2>Server side</h2>");
});
app.get("/api/key", (req, res) => {
  res.send({ apiKey: process.env.POLY_API_KEY });
});

async function start() {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("here");
    app.listen(3000, () =>
      console.log("Database connected , Server is listening on port 3000")
    );
  } catch (error) {
    console.log(error);
  }
}

start();
