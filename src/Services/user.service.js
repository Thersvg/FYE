import User from "../Model/User.model.js";

const createUserService = (body) => User.create(body);

const findAllUserService = () => User.find();

const findByIdService = (id) => User.findById(id);

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

export default {
  createUserService,
  findAllUserService,
  findByIdService,
  UpdateUser_Controller,
};
