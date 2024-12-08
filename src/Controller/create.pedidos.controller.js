import PedidosService from "../Services/create.pedidos.service.js";

const CreatePedidosController = async (req, res) => {
  try {
    const {
      codigo_pedido,
      name_cliente,
      valor_pedido,
      endereco_cliente,
      telefone_cliente,
      descricao_pedido,
      forma_pagamento,
      taxa_entrega,
    } = req.body;

    if (
      !codigo_pedido ||
      !name_cliente ||
      !valor_pedido ||
      !endereco_cliente ||
      !telefone_cliente ||
      !descricao_pedido ||
      !forma_pagamento ||
      !taxa_entrega
    ) {
      return res.send("Preencha todos os campos corretamente!");
    }
    await PedidosService.CreatePedidosService({
      codigo_pedido,
      name_cliente,
      valor_pedido,
      endereco_cliente,
      telefone_cliente,
      descricao_pedido,
      forma_pagamento,
      taxa_entrega,
      name_empresa: req.empresaId,
    });

    res.status(200).send("Pedido criado com sucesso!");
  } catch (err) {
    res.status(500).send("Falha ao criar entrega");
  }
};

const AllPedidosController = async (req, res) => {
  const pedidos = await PedidosService.AllPedidosService();

  if (pedidos.length === 0) {
    return res.send('');
  }

  res.send(pedidos);
};

const FindPedidoById = async (req, res) => {
  const id = req.empresaId;
  const pedidos = await PedidosService.FindPedidoByIdService(id);

  if (!pedidos) {
    return res.send("Não há entregas disponíveis");
  }
  res.send(pedidos);
};

const DeletePedido = async (req, res) => {
  try {
    const id = req.params.id;
    const DeletePedidoId = await PedidosService.deleteByIdService(id);

    res.send("Entrega excluida com sucesso!");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default {
  CreatePedidosController,
  AllPedidosController,
  DeletePedido,
  FindPedidoById,
};
