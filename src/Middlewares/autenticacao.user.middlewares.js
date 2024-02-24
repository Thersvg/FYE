import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import UserService from "../Services/user.service.js";

dotenv.config();

const autenticacaoMiddlwareUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.send(401);
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.send(401);
    }

    const [schema, token] = parts;
    if (schema !== "Bearer") {
      return res.send(401);
    }

    jwt.verify(token, process.env.SECRET_KEY_JWT, async (error, decoded) => {

      if (error) {
        return res.status(401).send("Token Inválido");
      }

      const user = await UserService.findByIdService(decoded.id);

      if (!user || !user.id) {
        return res.status(400).send("Nenhum usuário encontrado");
      }

      req.entregadorId = user.id;
      req.userEntregador = user;

      next();
    });
  } catch (err) {
    res.status(500).send("Falha ao iniciar sessão");
  }
};

export default { autenticacaoMiddlwareUser };
