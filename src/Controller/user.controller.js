import UserService from "../Services/user.service.js";

const create_User_Controller = async (req, res) => {
  try {
    const {
      name_entregador,
      cpf_entregador,
      password_entregador,
      email_entregador,
      formaDepagamento_entregador,
    } = req.body;

    if (
      !name_entregador ||
      !cpf_entregador ||
      !password_entregador ||
      !email_entregador ||
      !formaDepagamento_entregador
    ) {
      res.status(400).send({ message: "Preencha todos os campos" });
    }

    const user = await UserService.createUserService(req.body);

    if (!user) {
      return res.status(400).send({ message: "Erro na criação do usuário" });
    }

    res.status(201).send({
      message: "Usuário criado com sucesso",
      user: {
        id: user._id,
        name_entregador,
        cpf_entregador,
        password_entregador,
        email_entregador,
        formaDepagamento_entregador,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const FindAllUsers_Controller = async (req, res) => {
  try {
    const users = await UserService.findAllUserService();

    if (users.length === 0) {
      return res.status(400).send({ message: "Não há usuários cadastrados" });
    }

    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const FindUserId_Controller = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const UpdateUser_Controller = async (req, res) => {
  try {
    const {
      name_entregador,
      cpf_entregador,
      password_entregador,
      email_entregador,
      formaDepagamento_entregador,
    } = req.body;

    if (
      !name_entregador &&
      !cpf_entregador &&
      !password_entregador &&
      !email_entregador &&
      !formaDepagamento_entregador
    ) {
      res.status(400).send({ message: "Altere pelo menos um dado" });
    }

    const id = req.id;

    await UserService.UpdateUser_Controller(
      id,
      name_entregador,
      cpf_entregador,
      password_entregador,
      email_entregador,
      formaDepagamento_entregador
    );
    res.status(200).send({ message: "Dados atualizados com sucesso" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default {
  create_User_Controller,
  FindAllUsers_Controller,
  FindUserId_Controller,
  UpdateUser_Controller,
};
