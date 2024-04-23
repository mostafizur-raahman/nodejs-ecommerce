import express from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

// routes file
import rootRoute from "./routes/root.js";
// dotenv config
dotenv.config();

const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/", rootRoute);

app.get("/", (req, res) => {
    return res.status(200).send({
        success: "OK",
        message: "Hello World",
    });
});
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`APP is running on port ${PORT}`.bgMagenta.black);
});
