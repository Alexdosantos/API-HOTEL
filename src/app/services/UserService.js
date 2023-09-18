import { Crypto } from "../../utils/Crypts.js";
import JWT from "jsonwebtoken";
import { CommoError } from "../../utils/commoError.js";

class UserService {
  constructor(repository) {
    this.repository = repository;
  }
  async create(data) {
    try {
      const userExists = await this.repository.findByEmail(data.email);
      if (userExists) {
        return { error: true, message: "User already exists", status: 400 };
      }

      const user = {
        ...data,
        password: Crypto.encrypt(data.password),
      };
      const createUser = await this.repository.create(user);
      return { createUser };
    } catch (error) {
      return { error: true, message: "An error occurred", status: 500 };
    }
  }

  async login(data) {
    try {
      const user = await this.repository.findByEmail(data.email);
      console.log("Resultado da consulta no banco de dados:", user);

      if (!user) {
        console.log("Usuário não encontrado.");
        return { error: true, message: "Usuário não encontrado", status: 401 };
      }

      // Verifique a senha corretamente
      const isPasswordValid = Crypto.compare(data.password, user.password);

      if (!isPasswordValid) {
        console.log("Senha incorreta.");
        return { error: true, message: "Senha incorreta", status: 401 };
      }

      const secret = process.env.SECRET_KEY;
      const expiration = { expiresIn: "2m" };
      const token = JWT.sign({ userId: user._id }, secret, expiration);
      console.log("Token gerado:", token);

      console.log("Login bem-sucedido!");

      return { user, token };
    } catch (error) {
      console.error("Erro ao tentar logar:", error);
      return { error: true, message: "Erro ao tentar logar", status: 500 };
    }
  }
  async getUsers() {
    try {
      const users = await this.repository.findAll();
      return users;
    } catch (error) {
      return res
        .status(400)
        .json(CommoError.build("Erro na listagem de usuários", 400));
    }
  }
}

export { UserService };
