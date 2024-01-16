import { Router } from "express";
const PedidosRouter = Router();

import PedidosController from "../Controller/create.pedidos.controller.js";
import auth from "../Middlewares/autenticacao.empresa.middlewares.js";

PedidosRouter.post(
  "/",
  auth.autenticacaoMiddlware,
  PedidosController.CreatePedidosController
);
PedidosRouter.get("/", PedidosController.AllPedidosController);

PedidosRouter.delete("/:id", PedidosController.DeletePedido);

export default PedidosRouter;
