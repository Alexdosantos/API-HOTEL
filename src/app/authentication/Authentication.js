import JWt from "jsonwebtoken";
import { CommoError } from "../../utils/commoError.js";

class Authentication {
  static async authentic(req, res, next) {
    const { headers } = req;

    if (!headers.authorization) {
      return res
        .status(401)
        .json(CommoError.build("Autorização não concedida", 401 ));
    }
    const [, token] = headers.authorization.split(" ");

    try {
      JWt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return res
        .status(401)
        .json(CommoError.build("Autorização não concedida", 401));
    }
    next();
  }
}
export { Authentication };
