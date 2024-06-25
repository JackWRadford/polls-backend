import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiry = process.env.JWT_EXPIRY || "1h";

if (!jwtSecretKey) {
	throw new Error("JWT secret key is not defined in the env vars.");
}

const generateJWT = (id: string): string => {
	return jwt.sign({ id }, jwtSecretKey, {
		expiresIn: jwtExpiry,
	});
};

export default generateJWT;
