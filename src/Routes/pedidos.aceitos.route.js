import { Router } from "express";
const PedidosAceitosRouter = Router();

import PedidosAceitosController from "../Controller/pedidos.aceitos.controller.js";

import global from "../Middlewares/global.middlewares.js";
import auth from "../Middlewares/autenticacao.user.middlewares.js";

PedidosAceitosRouter.post(
  "/:id",
  auth.autenticacaoMiddlware,
  global.validId,
  PedidosAceitosController.CreatePedidosController,
);

PedidosAceitosRouter.get(
  "/",
  PedidosAceitosController.AllPedidosAceitosController
);

PedidosAceitosRouter.get(
  "/:id",
  global.validId,
  global.BuscaEmpresaEPedido,
  PedidosAceitosController.SelecionarPedidosPorEmpresaId
);

export default PedidosAceitosRouter;
