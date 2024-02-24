import UserService from "../Services/user.service.js";
import nodemailer from 'nodemailer';
import bcrypt from "bcrypt";
import User from "../Model/User.model.js";

const create_User_Controller = async (req, res) => {
  try {
    const {
      name_entregador,
      cpf_entregador,
      password_entregador,
      telefone_entregador,
      email_entregador,
      formaDepagamento_entregador,
    } = req.body;

    if (
      !name_entregador ||
      !cpf_entregador ||
      !password_entregador ||
      !telefone_entregador ||
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
        telefone_entregador,
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
    const user = req.userEntregador;
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
      telefone_entregador,
      email_entregador,
      formaDepagamento_entregador,
    } = req.body;

    if (
      !name_entregador &&
      !cpf_entregador &&
      !password_entregador &&
      !telefone_entregador &&
      !email_entregador &&
      !formaDepagamento_entregador
    ) {
      res.status(400).send({ message: "Altere pelo menos um dado" });
    }

    const id = req.entregadorId;

    await UserService.UpdateUser_Controller(
      id,
      name_entregador,
      cpf_entregador,
      password_entregador,
      telefone_entregador,
      email_entregador,
      formaDepagamento_entregador
    );
    res.status(200).send({ message: "Dados atualizados com sucesso" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const SendEmailUser = async (req,res) =>{
  try{
    const {
      email_entregador,
    } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'rodrigo17ifmt@gmail.com',
        pass: 'xudm bldd uauf wjvv',
      },
    });

    const caracteresPermitidos =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let resultado = "";

    for (let i = 0; i < 6; i++) {
      const indiceAleatorio = Math.floor(
        Math.random() * caracteresPermitidos.length
      );
      resultado += caracteresPermitidos.charAt(indiceAleatorio);
    }
  
    const mailOptions = {
      from: 'rodrigo17ifmt@gmail.com',
      to: `${email_entregador}`,
      subject: 'Reset your Password',
      text: 'Reset your Password',
      html: `<p>Your Code ${resultado}</p>`,
    };

    const response = await UserService.FindUserEmailService(email_entregador);

    if(response){
      await transporter.sendMail(mailOptions, (error, info) => {

        if (error) {
          return console.error(error);
        }
        res.status(200).send(resultado);
      });   
    }else{
      res.status(404).send({message: "Email inválido"});
    }
  
  }catch (error){
    res.status(500).send({message: 'Algo deu errado' + error});
  }

}

const RecoverUserController = async (req, res) => {
  try {
    let {
      password_entregador,
      email_entregador
    } = req.body;

    const Senha = await bcrypt.hash(password_entregador, 10);
  
    await UserService.UpdatePasswordUserService(
      password_entregador = Senha,
      email_entregador
    );
    res.status(200).send("Senha atualizada com sucesso");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default {
  create_User_Controller,
  FindAllUsers_Controller,
  FindUserId_Controller,
  UpdateUser_Controller,
  SendEmailUser,
  RecoverUserController,
};
