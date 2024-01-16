import HistoricoPedidosModel from "../Model/historico.pedidos.model.js";

const CreatePedidosHistoricoService = (body) =>
  HistoricoPedidosModel.create(body);


const FindPedidosHistoricoById = (id) =>
  HistoricoPedidosModel.findOne({ name_empresa: id })
    .sort({ _id: -1 })
    .populate("name_entregador")
    .populate("name_empresa")
    .populate("detalhes_pedido");

const FindPedidosHistoricoByIdEntregador = (id) =>
    HistoricoPedidosModel.findOne({ name_entregador: id })
      .sort({ _id: -1 })
      .populate("name_entregador")
      .populate("name_empresa")
      .populate("detalhes_pedido");

const FindPedidoHistoricoIDPedido = (id) =>
  HistoricoPedidosModel.findOne({ _id: id });

export default {
  CreatePedidosHistoricoService,
  FindPedidosHistoricoById,
  FindPedidoHistoricoIDPedido,
  FindPedidosHistoricoByIdEntregador,
};
