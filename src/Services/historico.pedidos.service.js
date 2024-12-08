import HistoricoPedidosModel from "../Model/historico.pedidos.model.js";

const CreatePedidosHistoricoService = (body) =>
  HistoricoPedidosModel.create(body);

const FindPedidosHistoricoById = (id) =>
  HistoricoPedidosModel.find({ name_empresa: id })
    .populate("name_entregador")
    .populate("name_empresa")
    .populate("detalhes_pedido");

const FindPedidosHistoricoByIdEntregador = (id) =>
  HistoricoPedidosModel.find({ name_entregador: id })
    .sort({ _id: -1 })
    .populate("name_entregador")
    .populate("name_empresa")
    .populate("detalhes_pedido");

const FindPedidoHistoricoIDPedido = (id) =>
  HistoricoPedidosModel.findOne({ _id: id });

const DeletePedidoHistorico = (id) =>
  HistoricoPedidosModel.deleteOne({ _id: id });

const FindOrderHistoric = (id) =>
   HistoricoPedidosModel.findOne({ _id: id })
  .sort({ _id: -1 })
  .populate("name_entregador")
  .populate("name_empresa")
  .populate("detalhes_pedido");


export default {
  CreatePedidosHistoricoService,
  FindPedidosHistoricoById,
  FindPedidoHistoricoIDPedido,
  FindPedidosHistoricoByIdEntregador,
  DeletePedidoHistorico,
  FindOrderHistoric,
};
