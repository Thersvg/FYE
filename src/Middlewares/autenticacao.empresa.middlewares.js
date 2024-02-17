import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import EmpresaService from "../Services/empresa.service.js";

dotenv.config();

const autenticacaoMiddlware = (req, res, next) => {
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
        return res.status(401).send({ message: "Token Inválido" });
      }

      const empresa = await EmpresaService.findIdEmpresaService(decoded.id);

      if (!empresa || !empresa.id) {
        return res.status(400).send({ message: "Empresa e Id não existem" });
      }

      req.empresaId = empresa.id;
      req.empresaAutenticada = empresa;
      req.nameCity = empresa.cidade_empresa;

      next();
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { autenticacaoMiddlware };
