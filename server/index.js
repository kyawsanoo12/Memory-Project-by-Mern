import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({ limit: "30mb",extended: true }));
app.use(cors());
app.use("/posts", postRoutes);
const CONNECTION_URL = "mongodb+srv://kyawsanoo:kyawsanoo11@cluster0.8g0jf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const port = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(port, () => console.log("Server is running on Port :" + port)))
    .catch((err) => console.log(err.message));