import mongoose from "mongoose";

const pedidosSchema = new mongoose.Schema({
  codigo_pedido: { type: String, require: true, unique: true },
  name_cliente: { type: String, require: true },
  valor_pedido: { type: String, require: true },
  endereco_cliente: { type: String, require: true },
  telefone_cliente: { type: String, require: true },
  descricao_pedido: { type: String, require: true },
  forma_pagamento: { type: String, require: true },
  taxa_entrega: { type: String, require: true },
  name_empresa: {
    type: mongoose.Types.ObjectId,
    ref: "Empresa",
    require: true,
  },
});

const pedidos = mongoose.model("Pedidos", pedidosSchema);

export default pedidos;
