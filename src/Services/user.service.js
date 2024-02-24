import User from "../Model/User.model.js";

const createUserService = (body) => User.create(body);

const findAllUserService = () => User.find();

const findByIdService = (id) => User.findById(id);

const FindUserEmailService = (email) => User.findOne({email_entregador:email});

const UpdateUser_Controller = (
  id,
  name_entregador,
  cpf_entregador,
  password_entregador,
  telefone_entregador,
  email_entregador,
  formaDepagamento_entregador
) =>
  User.findOneAndUpdate(
    { _id: id },
    {
      name_entregador,
      cpf_entregador,
      password_entregador,
      telefone_entregador,
      email_entregador,
      formaDepagamento_entregador,
    }
  );

const UpdatePasswordUserService = (
    password_entregador,
    email_entregador
  ) =>
    User.findOneAndUpdate(
      { email_entregador: email_entregador },
      {
        password_entregador
      }
    );

export default {
  createUserService,
  findAllUserService,
  findByIdService,
  UpdateUser_Controller,
  FindUserEmailService,
  UpdatePasswordUserService,
};
