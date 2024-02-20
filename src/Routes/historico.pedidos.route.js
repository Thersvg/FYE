import { Router } from "express";
const PedidosHstoricoRouter = Router();

import auth from "../Middlewares/global.middlewares.js";
import authuser from "../Middlewares/autenticacao.user.middlewares.js";
import authEmpresa from "../Middlewares/autenticacao.empresa.middlewares.js";
import HistoricoPedidosController from "../Controller/HistoricoPedidos.controller.js";

PedidosHstoricoRouter.post(
  "/:id?",
  auth.validId,
  auth.BuscaEmpresaEPedidoParaHistorico,
  HistoricoPedidosController.PedidoEntregue
);
PedidosHstoricoRouter.get(
  "/empresa/:id?",
  authEmpresa.autenticacaoMiddlware,
  HistoricoPedidosController.HistoricoCompletoDePedidosEntregues
);

PedidosHstoricoRouter.get(
  "/entregador/:id?",
  authuser.autenticacaoMiddlwareUser,
  HistoricoPedidosController.HistoricoCompletoDePedidosEntreguesEntregador
);

PedidosHstoricoRouter.delete(
  "/:id?",
  auth.validId,
  HistoricoPedidosController.DeleteOrderById
);

export default PedidosHstoricoRouter;
