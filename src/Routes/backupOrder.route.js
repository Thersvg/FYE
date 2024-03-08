import { Router } from "express";

const BackupOrderRouter = Router();

import auth from "../Middlewares/global.middlewares.js";
import HistoricoPedidosController from "../Controller/HistoricoPedidos.controller.js";

PedidosHstoricoRouter.post(
  "/:id?",
  auth.validId,
  auth.FindOrderHistoricToBackup,
  HistoricoPedidosController.PedidoEntregue
);