import { Router } from "express";
const PedidosAceitosRouter = Router();

import PedidosAceitosController from "../Controller/pedidos.aceitos.controller.js";

import global from "../Middlewares/global.middlewares.js";
import auth from "../Middlewares/autenticacao.empresa.middlewares.js";

PedidosAceitosRouter.post(
  "/:id",
  auth.autenticacaoMiddlware,
  global.validId,
  PedidosAceitosController.CreatePedidosController
);

PedidosAceitosRouter.get(
  "/All",
  PedidosAceitosController.AllPedidosAceitosController
);

PedidosAceitosRouter.get(
  "/empresa/:id?",
  auth.autenticacaoMiddlware,
  global.BuscaEmpresaEPedido,
  PedidosAceitosController.SelecionarPedidosPorEmpresaId
);

export default PedidosAceitosRouter;
