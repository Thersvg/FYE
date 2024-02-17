import Empresa from "../Model/empresa.model.js";

const createEmpresaService = (body) => Empresa.create(body);

const findAllEmpresaService = () => Empresa.find();

const findIdEmpresaService = (id) => Empresa.findById(id);

const deleteByIdService = (id) => Empresa.deleteOne({ _id: id });

const FindEmailEmpresaService = (email) => Empresa.findOne({email_empresa:email});

const updateEmpresaService = (
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
) =>
  Empresa.findOneAndUpdate(
    { _id: id },
    {
      name_empresa,
      cnpj_empresa,
      password_empresa,
      email_empresa,
      endereco_empresa,
      telefone_empresa,
      logo_empresa,
      taxa_entrega_empresa,
      cidade_empresa
    }
  );

  const updatePasswordEmpresaService = (
    password_empresa,
    email_empresa,
  ) =>
    Empresa.findOneAndUpdate(
      { email_empresa: email_empresa },
      {
        password_empresa
      }
    );

export default {
  createEmpresaService,
  findAllEmpresaService,
  findIdEmpresaService,
  updateEmpresaService,
  deleteByIdService,
  FindEmailEmpresaService,
  updatePasswordEmpresaService,
};
