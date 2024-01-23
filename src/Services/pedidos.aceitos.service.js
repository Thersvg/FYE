import PedidosAceitos from "../Model/pedidos.aceitos.model.js";

const CreatePedidosAceitosService = (body) => PedidosAceitos.create(body);

const AllPedidosAceitosService = () =>
  PedidosAceitos.find()
    .sort({ _id: -1 })
    .populate("name_entregador")
    .populate("name_empresa")
    .populate("detalhes_pedido");

const FindPedidosAceitosById = (id) =>
  PedidosAceitos.find({ name_empresa: id })
    .sort({ _id: -1 })
    .populate("name_entregador")
    .populate("name_empresa")
    .populate("detalhes_pedido");

const FindPedidosAceitosByIdPedido = (id) =>
  PedidosAceitos.findOne({ _id: id })
    .sort({ _id: -1 })
    .populate("name_entregador")
    .populate("name_empresa")
    .populate("detalhes_pedido");

const DeletePedidoAceitoById = (id) =>
  PedidosAceitos.deleteOne({ name_empresa: id });

const DeletePedidoAceitoByIdDoPedido = (id) =>
  PedidosAceitos.deleteOne({ _id: id });

export default {
  CreatePedidosAceitosService,
  AllPedidosAceitosService,
  FindPedidosAceitosById,
  DeletePedidoAceitoById,
  FindPedidosAceitosByIdPedido,
  DeletePedidoAceitoByIdDoPedido,
};
