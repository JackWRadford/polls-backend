import jwt, { JwtPayload } from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiry = process.env.JWT_EXPIRY || "1h";

if (!jwtSecretKey) {
  throw new Error("JWT secret key is not defined in the env vars.");
}

export interface JwtUserPayload extends JwtPayload {
  id: string;
}

export const generateJWT = (id: string): string => {
  return jwt.sign({ id: id }, jwtSecretKey, {
    expiresIn: jwtExpiry,
  });
};

export const verifyJWT = (token: string): Promise<JwtUserPayload> => {
  return new Promise((resolve, reject) => {
    let extractedToken = token;
    // Check that the token is a Bearer token.
    if (token.startsWith("Bearer ")) {
      // Extract the token.
      extractedToken = token.slice(7, token.length);
    }

    // Verifyt the token.
    jwt.verify(extractedToken, jwtSecretKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as JwtUserPayload);
      }
    });
  });
};
