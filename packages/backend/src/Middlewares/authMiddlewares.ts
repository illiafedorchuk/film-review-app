import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../db/data-source";
import { User } from "../Users/user";

interface ExtendedRequest extends Request {
  user?: User;
}

const protect = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken;
    console.log(token);

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_KEY || "your_jwt_secret"
    ) as jwt.JwtPayload;

    const currentUser = await AppDataSource.getRepository(User).findOneBy({
      id: decoded.id,
    });

    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "The user belonging to this token no longer exists.",
      });
    }

    req.user = currentUser; // Attach the user to the request object
    next();
  } catch (error) {
    console.error("Error in protect middleware:", error);
    return res.status(401).json({
      status: "fail",
      message: "Authentication failed.",
    });
  }
};

export default protect;
