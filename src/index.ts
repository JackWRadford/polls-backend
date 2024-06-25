import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import "./loadEnv.js";
import auth from "./routes/auth.js";
import polls from "./routes/polls.js";

const app = express();

// Configure Express Middleware
app.use(express.json());
app.use(cookieParser());
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
