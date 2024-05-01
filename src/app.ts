import "./loadEnv.js";
import polls from "./routes/polls.js";
import express from "express";

const app = express();

// Configure Express Middleware.
app.use(express.json());

// Load the /polls routes
app.use("/polls", polls);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server listening at port: ${port}`);
});
