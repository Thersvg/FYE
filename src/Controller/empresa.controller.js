import EmpresaService from "../Services/empresa.service.js";
import fs from "fs";

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
    } = req.body;

    if (
      !name_empresa ||
      !cnpj_empresa ||
      !password_empresa ||
      !email_empresa ||
      !endereco_empresa ||
      !telefone_empresa ||
      !logo_empresa ||
      !taxa_entrega_empresa
    ) {
      return res
        .status(400)
        .send({ message: "Preencha todos os campos corretamente" });
    }

    const Empresa = await EmpresaService.createEmpresaService(req.body);

    if (!Empresa) {
      return res.status(400).send({ message: "Erro na criação da empresa" });
    }

    const dadosImagemLogo_empresa = fs.readFileSync(logo_empresa);

    res.status(201).send({
      message: "Empresa criado com sucesso",
      Empresa: {
        id: Empresa._id,
        name_empresa,
        cnpj_empresa,
        password_empresa,
        email_empresa,
        endereco_empresa,
        telefone_empresa,
        dadosImagemLogo_empresa,
        taxa_entrega_empresa,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
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
    const empresa = req.empresa;
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
    } = req.body;

    if (
      !name_empresa &&
      !cnpj_empresa &&
      !password_empresa &&
      !email_empresa &&
      !endereco_empresa &&
      !telefone_empresa &&
      !logo_empresa &&
      !taxa_entrega_empresa
    ) {
      res.status(400).send({ message: "Preencha pelo menos um campo" });
    }

    const id = req.id;

    await EmpresaService.updateEmpresaService(
      name_empresa,
      cnpj,
      password,
      email,
      endereco,
      telefone,
      logo,
      taxa_entrega,
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

export default {
  CreateEmpresaController,
  FindAllEmpresaController,
  FindIdEmpresaController,
  UpdateEmpresaController,
  DeleteEmpresa,
};
