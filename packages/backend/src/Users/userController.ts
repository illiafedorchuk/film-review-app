import { Request, Response } from "express"; // Import these types
import { AppDataSource } from "../../db/data-source";
import { User } from "./user";

class UsersController {
  public async create(req: Request, res: Response) {
    const { nickname } = req.body;

    const newUser = new User();
    newUser.nickname = nickname; // Set the nickname of the new user

    await AppDataSource.getRepository(User).save(newUser); // Don't forget to save the new user
    res.json(newUser); // Send back the created user as a response
  }
}

export const userController = new UsersController();
