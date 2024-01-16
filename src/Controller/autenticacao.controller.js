import bcrypt from "bcrypt";
import AutenticacaoService from "../Services/autenticacao.service.js";

const autenticacaoControllerLogin = async (req, res) => {
  try {
    const { email_empresa, password_empresa } = req.body;
    const empresa = await AutenticacaoService.LoginService(email_empresa);
    const passwordIsValid = bcrypt.compareSync(
      password_empresa,
      empresa.password_empresa
    );

    if (!passwordIsValid) {
      return res.status(404).send({ message: "Email ou senha inválidos" });
    }

    if (!empresa) {
      return res.status(404).send({ message: "Email ou senha inválidos" });
    }

    const token = AutenticacaoService.GeradorDeToken(empresa.id);

    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export default autenticacaoControllerLogin;
