import EmpresaService from "../Services/empresa.service.js";
import authEmpresa from "../Services/autenticacao.service.js";
import nodemailer from 'nodemailer';

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
        .send({ message: "Preencha todos os campos corretamente" });
    }

    const Empresa = await EmpresaService.createEmpresaService(req.body);
    const token = authEmpresa.GeradorDeToken(Empresa._id);

    if (!Empresa) {
      return res.status(400).send({ message: "Erro na criação da empresa" });
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
    res.status(500).send({ message: "Erro ao criar conta" });
  }
};

const FindAllEmpresaController = async (req, res) => {
  try {
    const empresas = await EmpresaService.findAllEmpresaService();

    if (empresas.length === 0) {
      return res.send({ message: "Nenhuma empresa cadastrada" });
    }
    res.send(empresas);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const FindIdEmpresaController = async (req, res) => {
  try {
    /*     const empresa = req.empresa; */

    const empresa = req.empresaAutenticada;

    /*     req.empresaId = empresa.id;
    req.empresaAutenticada = empresa; */

    res.send(empresa);
  } catch (err) {
    res.status(500).send({ message: err.message });
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
      res.status(400).send({ message: "Atualize algum dado"});
    } 

    /*     const id = req.id; */
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
    res.status(200).send({ message: "Dados atualizados com sucesso" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const DeleteEmpresa = async (req, res) => {
  try {
    const id = req.params.id;
    const DeleteEmpresaId = await EmpresaService.deleteByIdService(id);

    res.send({ message: "Empresa excluida com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
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
        user: 'rodrigo17ifmt@gmail.com',
        pass: 'xudm bldd uauf wjvv',
      },
    });
  
    const mailOptions = {
      from: 'rodrigo17ifmt@gmail.com',
      to: `${email_empresa}`,
      subject: 'Reset your Password',
      text: 'Reset your Password',
      html: '<p>Click here for reset your password</p> <link>www.google.com</link>',
    };
  
    await transporter.sendMail(mailOptions, (error, info) => {

      if (error) {
        return console.error(error);
      }
      res.status(200).send({message: 'E-mail enviado: ' + info.response});
    });
  }catch (error){
    res.status(500).send({message: 'Algo deu errado' + error});
  }

}


export default {
  CreateEmpresaController,
  FindAllEmpresaController,
  FindIdEmpresaController,
  UpdateEmpresaController,
  DeleteEmpresa,
  SendEmail
};
