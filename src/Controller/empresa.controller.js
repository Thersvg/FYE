import EmpresaService from "../Services/empresa.service.js";
import authEmpresa from "../Services/autenticacao.service.js";
import nodemailer from 'nodemailer';
import bcrypt from "bcrypt";

const CreateEmpresaController = async (req, res) => {
  try {
    const {
      name_empresa,
      cnpj_empresa,
      password_empresa,
      email_empresa,
      endereco_empresa,
      telefone_empresa,
      logo_empresa,
      taxa_entrega_empresa,
      cidade_empresa,
    } = req.body;

    if (
      !name_empresa ||
      !cnpj_empresa ||
      !password_empresa ||
      !email_empresa ||
      !endereco_empresa || 
      !telefone_empresa ||
      !logo_empresa || 
      !taxa_entrega_empresa || 
      !cidade_empresa
    ) {
      return res
        .status(400)
        .send("Preencha todos os campos corretamente");
    }


    const VerifyEmailToCreate = await EmpresaService.FindEmailEmpresaService(email_empresa);

    if(VerifyEmailToCreate){
      return res.status(400).send("Email já existente");
    }

    const Empresa = await EmpresaService.createEmpresaService(req.body);
    const token = authEmpresa.GeradorDeToken(Empresa._id);

    if (!Empresa) {
      return res.status(400).send("Erro na criação da conta");
    }
    
    res.status(201).send({
      token,
      message: "Empresa criado com sucesso",

      Empresa: {
        id: Empresa._id,
        name_empresa,
        cnpj_empresa,
        password_empresa,
        email_empresa,
        endereco_empresa,
        telefone_empresa,
        logo_empresa,
        taxa_entrega_empresa,
        cidade_empresa,
      },
    });
  } catch (err) {
    res.status(500).send(err.message);
    //"Falha na criação da conta"
  }
};

const FindAllEmpresaController = async (req, res) => {
  try {
    const empresas = await EmpresaService.findAllEmpresaService();

    if (empresas.length === 0) {
      return res.send("Nenhuma empresa cadastrada");
    }
    res.send(empresas);
  } catch (err) {
    res.status(500).send("Falha ao buscar empresa");
  }
};

const FindIdEmpresaController = async (req, res) => {
  try {
    const empresa = req.empresaAutenticada;
    res.send(empresa);
  } catch (err) {
    res.status(500).send("Falha ao buscar empresa");
  }
};

const UpdateEmpresaController = async (req, res) => {
  try {
    const {
      name_empresa,
      cnpj_empresa,
      password_empresa,
      email_empresa,
      endereco_empresa,
      telefone_empresa,
      logo_empresa,
      taxa_entrega_empresa,
      cidade_empresa
    } = req.body;


     if (
      !name_empresa &&
      !cnpj_empresa &&
      !password_empresa &&
      !email_empresa &&
      !endereco_empresa &&
      !telefone_empresa &&
      !logo_empresa &&
      !taxa_entrega_empresa &&
      !cidade_empresa
    ) {
      res.status(400).send("Atualize algum dado");
    } 

    const id = req.empresaId;
    
    await EmpresaService.updateEmpresaService(
      name_empresa,
      cnpj_empresa,
      password_empresa,
      email_empresa,
      endereco_empresa,
      telefone_empresa,
      logo_empresa,
      taxa_entrega_empresa,
      cidade_empresa,
      id
    );
    res.status(200).send("Dados atualizados com sucesso");
  } catch (err) {
    res.status(500).send("Falha ao atualizar os dados");
  }
};

const RecoverEmpresaController = async (req, res) => {
  try {
    let {
      password_empresa,
      email_empresa
    } = req.body;

    const Senha = await bcrypt.hash(password_empresa, 10);
  
    await EmpresaService.updatePasswordEmpresaService(
      password_empresa =  Senha,
      email_empresa
    );
    res.status(200).send("Senha atualizada com sucesso");
  } catch (err) {
    res.status(500).send("Falha ao atualizar senha");
  }
};

const DeleteEmpresa = async (req, res) => {
  try {
    const id = req.params.id;
    const DeleteEmpresaId = await EmpresaService.deleteByIdService(id);

    res.send("Conta excluida com sucesso!");
  } catch (err) {
    res.status(500).send("Falha ao exluir conta");
  }
};

const SendEmail = async (req,res) =>{
  try{
    const {
      email_empresa,
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
      to: `${email_empresa}`,
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

    const response = await EmpresaService.FindEmailEmpresaService(email_empresa);

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


export default {
  CreateEmpresaController,
  FindAllEmpresaController,
  FindIdEmpresaController,
  UpdateEmpresaController,
  RecoverEmpresaController,
  DeleteEmpresa,
  SendEmail
};
