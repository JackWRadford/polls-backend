import "./loadEnv.js";
import polls from "./routes/polls.js";
import auth from "./routes/auth.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

// Configure Express Middleware
app.use(express.json());
app.use(helmet());
// Configure CORS
const corsOptions = {
	origin: process.env.FRONTEND_ORIGIN,
	optionsSuccessStatus: 200,
	credentials: true,
};
app.use(cors(corsOptions));

// Configure routes.
app.use("/polls", polls);
app.use("/auth", auth);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server listening at port: ${port}`);
});

export default app;
