import "./loadEnv.js";
import polls from "./routes/polls.js";
import express from "express";
import cors from "cors";

const app = express();

// Configure Express Middleware
app.use(express.json());
// Configure CORS
const corsOptions = {
	origin: process.env.FRONTEND_ORIGIN,
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Load the /polls routes
app.use("/polls", polls);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server listening at port: ${port}`);
});
