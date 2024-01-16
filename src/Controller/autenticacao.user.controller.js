import bcrypt from "bcrypt";
import AutenticacaoUserService from "../Services/autenticacao.user.service.js";

const autenticacaoUserControllerLogin = async (req, res) => {
  try {
    const { email_entregador, password_entregador } = req.body;
    const user = await AutenticacaoUserService.LoginService(email_entregador);
    const passwordIsValid = bcrypt.compareSync(password_entregador, user.password_entregador);

    if (!passwordIsValid) {
      return res.status(404).send({ message: "Email ou senha inválidos" });
    }

    if (!user) {
      return res.status(404).send({ message: "Email ou senha inválidos" });
    }

    const token = AutenticacaoUserService.GeradorDeToken(user.id);

    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export default autenticacaoUserControllerLogin;
