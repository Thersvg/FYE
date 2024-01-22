import Pedidos from "../Model/pedidos.model.js";

const CreatePedidosService = (body) => Pedidos.create(body);

const AllPedidosService = () =>
  Pedidos.find().sort({ _id: -1 }).populate("name_empresa");

const FindPedidoByIdService = (id) =>
  Pedidos.findOne({ name_empresa: id })
    .sort({ _id: -1 })
    .populate("name_empresa");

const deleteByIdService = (id) => Pedidos.deleteOne({ _id: id });

export default {
  CreatePedidosService,
  AllPedidosService,
  deleteByIdService,
  FindPedidoByIdService,
};
