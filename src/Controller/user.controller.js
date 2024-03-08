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
      res.status(400).send("Preencha todos os campos");
    }

    const user = await UserService.createUserService(req.body);

    if (!user) {
      return res.status(400).send("Erro na criação do usuário");
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
    res.status(500).send("Falha ao criar usuário");
  }
};

const FindAllUsers_Controller = async (req, res) => {
  try {
    const users = await UserService.findAllUserService();

    if (users.length === 0) {
      return res.status(400).send("Não há usuários cadastrados");
    }

    res.send(users);
  } catch (err) {
    res.status(500).send("Falha ao buscar usuários cadastrados");
  }
};

const FindUserId_Controller = async (req, res) => {
  try {
    const user = req.userEntregador;
    res.send(user);
  } catch (err) {
    res.status(500).send("Falha ao buscar usuário");
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
      res.status(400).send("Altere pelo menos um dado");
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
    res.status(200).send("Dados atualizados com sucesso");
  } catch (err) {
    res.status(500).send("Erro ao atualizar dados");
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
        user: 'foryouentregas@gmail.com',
        pass: 'hukz jowy dxyh qruf',
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
      from: 'foryouentregas@gmail.com',
      to: `${email_entregador}`,
      subject: 'Recuperação de senha',
      text: 'Recuperação de senha',
      html: `  
      <h2>Código para recuperação</h2>
      <p>Olá,</p>
      <p>Recebemos uma solicitação para recuperar a sua senha. Utilize o código abaixo para realizar a recuperação:</p>
      <h2>${resultado}</h2>
      <p>Por favor, não responda esse e-mail.</p>
      <p>Atenciosamente,</p>
      <p>For you entregas</p>     
      `,
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
      res.status(404).send("Email inválido");
    }
  
  }catch (error){
    res.status(500).send('Erro ao enviar código');
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
    res.status(500).send("Falha na atualização");
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
