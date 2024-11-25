import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export function checkValidationResult(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const validationRes = validationResult(req);
  // Check that the request is valid.
  if (!validationRes.isEmpty()) {
    const errors = validationRes.array();
    console.error(errors);
    const errorMessage = errors.length > 0 ? errors[0].msg : "Invalid request.";
    return res.status(400).send({
      message: errorMessage,
      errors: validationRes.array(),
    });
  }
  next();
}
