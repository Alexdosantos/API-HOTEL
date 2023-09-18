import * as yup from "yup";
import { CommoError } from "../../utils/commoError.js";


class UserControllers {
  constructor(service) {
    this.service = service;
  }

  async create(req, res) {
    const { body } = req;

    const userSchema = yup.object({
      name: yup.string().required(),
      email: yup.string().email("Invalid email format").required(),
      password: yup.string().required(),
    });
    try {
      await userSchema.validate(body);
    } catch (err) {
      return res
        .status(400)
        .json({ error: true, message: err.errors, status: 400 });
    }
    const result = await this.service.create(body);

    if ("error" in result) {
      return res.status(result.status).json(result);
    }
    return res.status(201).json({ ...result });
  }

  async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      const logiSchema = yup.object({
        email: yup.string().email("Formato de email errado").required(),
        password: yup.string().required(),
      });
      await logiSchema.validate({ email, password });
      const result = await this.service.login({ email, password });

      if (result.error) {
        return res.status(result.status).json(result);
      }
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(400)
        .json({ error: true, message: error.message, status: 400 });
    }
  }

  async getUsers(req ,res) {
    try {
      const users = await this.service.getUsers();
      return res.status(200).json(users); // Não é necessário usar res.status(200).json(users)
    } catch (error) {
      return { error: true, message: "Erro na listagem de usuários", status: 400 };
    }
  }
  
}

export { UserControllers };
