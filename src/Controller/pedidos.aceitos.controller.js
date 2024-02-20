import PedidosAceptService from "../Services/pedidos.aceitos.service.js";

import PedidosCriadosService from "../Services/create.pedidos.service.js";

import userService from "../Services/user.service.js";

import empresaService from "../Services/empresa.service.js";

const CreatePedidosController = async (req, res, next) => {
  try {
    const pedidoID = req.id;
    const PedidoDB = await PedidosCriadosService.findByIdService(pedidoID);

    if (PedidoDB.length === 0) {
      res.send({ message: "Não foi possivel encontrar o pedido desse ID" });
    }

    const EntregadorID = req.entregadorId;
    const EntregadorDB = await userService.findByIdService(EntregadorID);

    const EmpresaID = PedidoDB.name_empresa._id;
    const EmpresaDB = await empresaService.findIdEmpresaService(EmpresaID);

    const {
      codigo_pedido,
      name_cliente,
      valor_pedido,
      endereco_cliente,
      telefone_cliente,
      descricao_pedido,
      forma_pagamento,
      taxa_entrega,
    } = PedidoDB;

    const {
      name_entregador,
      cpf_entregador,
      password_entregador,
      email_entregador,
      telefone_entregador,
      formaDepagamento_entregador,
    } = EntregadorDB;

    const {
      name_empresa,
      cnpj_empresa,
      password_empresa,
      email_empresa,
      endereco_empresa,
      telefone_empresa,
      logo_empresa,
      taxa_entrega_empresa,
    } = EmpresaDB;

    const pedidoselecionado =
      await PedidosAceptService.CreatePedidosAceitosService({
        detalhes_pedido: {
          codigo_pedido,
          name_cliente,
          valor_pedido,
          endereco_cliente,
          telefone_cliente,
          descricao_pedido,
          forma_pagamento,
          taxa_entrega,
        },
        name_entregador: EntregadorDB,
        name_empresa: EmpresaDB,
      });

    await PedidosCriadosService.deleteByIdService(pedidoID);

    res.status(200).send({ message: "Pedido aceito com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const AllPedidosAceitosController = async (req, res) => {
  try {
    const pedidosAceitos = await PedidosAceptService.AllPedidosAceitosService();

    if (pedidosAceitos.length === 0) {
      return res.status(400).send({ message: "Não há pedidos aceitos" });
    }
    res.send({ pedidosAceitos });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const PedidoAceitoEntregador = async (req, res) => {
  try {
    const id = req.entregadorId;
    const PedidoAceito = await PedidosAceptService.FindPedidosAceitosByIdEntregador(id);

    if (PedidoAceito.length === 0) {
      return res.send('');
    }

    res.status(200).send(PedidoAceito);

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const SelecionarPedidosPorEmpresaId = async (req, res) => {
  try {
    const empresa = req.empresa;
    res.send(empresa);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default {
  CreatePedidosController,
  AllPedidosAceitosController,
  SelecionarPedidosPorEmpresaId,
  PedidoAceitoEntregador,
};
