import User from "../Model/User.model.js";
import jwt from "jsonwebtoken";

const LoginService = (email_entregador) =>
  User.findOne({ email_entregador: email_entregador }).select(
    "+password_entregador"
  );

const GeradorDeToken = (id) =>
  jwt.sign({ id: id }, process.env.SECRET_KEY_JWT, { expiresIn: 86400 });

export default { LoginService, GeradorDeToken };
