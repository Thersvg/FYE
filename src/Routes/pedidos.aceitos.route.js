import { Router } from "express";
const PedidosAceitosRouter = Router();

import PedidosAceitosController from "../Controller/pedidos.aceitos.controller.js";

import global from "../Middlewares/global.middlewares.js";
import auth from "../Middlewares/autenticacao.empresa.middlewares.js";
import authuser from "../Middlewares/autenticacao.user.middlewares.js";

PedidosAceitosRouter.post(
  "/:id?",
  authuser.autenticacaoMiddlwareUser,
  global.validId,
  PedidosAceitosController.CreatePedidosController
);

/* PedidosAceitosRouter.get(
  "/All",
  PedidosAceitosController.AllPedidosAceitosController
); */

PedidosAceitosRouter.get(
  "/entregador/:id?",
  authuser.autenticacaoMiddlwareUser,
  PedidosAceitosController.PedidoAceitoEntregador
);

PedidosAceitosRouter.get(
  "/empresa/:id?",
  auth.autenticacaoMiddlware,
  global.BuscaEmpresaEPedido,
  PedidosAceitosController.SelecionarPedidosPorEmpresaId
);

export default PedidosAceitosRouter;
