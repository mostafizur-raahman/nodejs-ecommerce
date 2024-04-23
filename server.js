import express from "express";

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
    return res.status(200).send({
        success: "OK",
        message: "Hello World",
    });
});

app.listen(PORT, () => {
    console.log(`APP is running on port ${PORT}`);
});
