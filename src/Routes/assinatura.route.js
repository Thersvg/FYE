import { Router } from "express";
import auth from "../Middlewares/autenticacao.empresa.middlewares.js";
import CreatePlan from "../Controller/PlanMP.js";

const AssinaturaRouter = Router();

AssinaturaRouter.post("/criar", auth.autenticacaoMiddlware, CreatePlan.CreatePlan);
AssinaturaRouter.post("/assinar", auth.autenticacaoMiddlware, CreatePlan.SubscribeToPlan);
AssinaturaRouter.post("/card", auth.autenticacaoMiddlware, CreatePlan.Card);

export default AssinaturaRouter;
