import { Router } from "express";
const PedidosHstoricoRouter = Router();

import auth from "../Middlewares/global.middlewares.js";
import HistoricoPedidosController from "../Controller/HistoricoPedidos.controller.js";

PedidosHstoricoRouter.post(
  "/:id",
  auth.validId,
  auth.BuscaEmpresaEPedidoParaHistorico,
  HistoricoPedidosController.PedidoEntregue
);
PedidosHstoricoRouter.get(
  "/empresa/:id",
  auth.validId,
  HistoricoPedidosController.HistoricoCompletoDePedidosEntregues
);

PedidosHstoricoRouter.get(
  "/entregador/:id",
  auth.validId,
  HistoricoPedidosController.HistoricoCompletoDePedidosEntreguesEntregador
);

export default PedidosHstoricoRouter;