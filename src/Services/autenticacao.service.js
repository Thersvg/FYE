import Empresa from "../Model/empresa.model.js";
import jwt from "jsonwebtoken";

const LoginService = (email_empresa) =>
  Empresa.findOne({ email_empresa: email_empresa }).select("+password_empresa");

const GeradorDeToken = (id) =>
  jwt.sign({ id: id }, process.env.SECRET_KEY_JWT, { expiresIn: 86400 });

export default { LoginService, GeradorDeToken };
