import { UserRepository } from "../repositories/UserRepositories.js";
import { UserControllers } from "../controllers/UserControllers.js";
import { UserService } from "../services/UserService.js";
import { User } from "../../domain/User.js";

class MakerUsers {
  static getInstance() {
    const repositories = new UserRepository(User);
    const service = new UserService(repositories);
    const constrollers = new UserControllers(service);
    return constrollers;
  }
}

export { MakerUsers };
