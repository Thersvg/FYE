import { Router } from "express";
const PedidosRouter = Router();

import PedidosController from "../Controller/create.pedidos.controller.js";
import auth from "../Middlewares/autenticacao.empresa.middlewares.js";

PedidosRouter.post(
  "/",
  auth.autenticacaoMiddlware,
  PedidosController.CreatePedidosController
);
PedidosRouter.get("/All", PedidosController.AllPedidosController);

PedidosRouter.get(
  "/:id?",
  auth.autenticacaoMiddlware,
  PedidosController.FindPedidoById
);

PedidosRouter.delete("/:id?", PedidosController.DeletePedido);

export default PedidosRouter;
