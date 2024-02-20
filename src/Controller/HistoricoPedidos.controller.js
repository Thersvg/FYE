import HistoricoPedidosService from "../Services/historico.pedidos.service.js";

import PedidosGerais from "../Services/pedidos.aceitos.service.js";

const PedidoEntregue = async (req, res) => {
  try {
    const pedidoID = req.id;
    const PedidoDB = req.empresa;

    if (!PedidoDB) {
      res.send({ message: "Não foi possivel encontrar o pedido desse ID" });
    }

    const {
      codigo_pedido,
      name_cliente,
      valor_pedido,
      endereco_cliente,
      telefone_cliente,
      descricao_pedido,
      forma_pagamento,
      taxa_entrega,
    } = PedidoDB.detalhes_pedido;

    const InfoEntregador = PedidoDB.name_entregador;
    const InfoEmpresa = PedidoDB.name_empresa;

    await HistoricoPedidosService.CreatePedidosHistoricoService({
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
      name_entregador: InfoEntregador,
      name_empresa: InfoEmpresa,
    });

    await PedidosGerais.DeletePedidoAceitoByIdDoPedido(pedidoID);
    res.status(200).send(PedidoDB);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const HistoricoCompletoDePedidosEntregues = async (req, res) => {
  try {
    const id = req.empresaId;
    const AllPedidosEntregues =
      await HistoricoPedidosService.FindPedidosHistoricoById(id);
    res.send(AllPedidosEntregues);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const HistoricoCompletoDePedidosEntreguesEntregador = async (req, res) => {
  try {
    const id = req.entregadorId;
    const AllPedidosEntregues =
      await HistoricoPedidosService.FindPedidosHistoricoByIdEntregador(id);
    res.status(200).send([AllPedidosEntregues]);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const DeleteOrderById = async (req, res) => {
  try {
    const id = req.id;
    await HistoricoPedidosService.DeletePedidoHistorico(id);
    res.status(200).send({ message: "Pedido Finalizado" });
  } catch (error) {
    res.status(500).send({ message: error.message });
    throw error;
  }
};

export default {
  PedidoEntregue,
  HistoricoCompletoDePedidosEntregues,
  HistoricoCompletoDePedidosEntreguesEntregador,
  DeleteOrderById,
};
