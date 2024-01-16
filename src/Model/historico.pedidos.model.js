import mongoose, { mongo } from "mongoose";

const HistoricoPedidosSchema = new mongoose.Schema({
  detalhes_pedido: {
    codigo_pedido: { type: String, require: true },
    name_cliente: { type: String, require: true },
    valor_pedido: { type: String, require: true },
    endereco_cliente: { type: String, require: true },
    telefone_cliente: { type: String, require: true },
    descricao_pedido: { type: String, require: true },
    forma_pagamento: { type: String, require: true },
    taxa_entrega: { type: String, require: true },
  },
  name_entregador: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
  },
  name_empresa: {
    type: mongoose.Types.ObjectId,
    ref: "Empresa",
    require: true,
  },
});

const HistoricoDosPedidos = mongoose.model(
  "HistoricoPedidos",
  HistoricoPedidosSchema
);

export default HistoricoDosPedidos;
