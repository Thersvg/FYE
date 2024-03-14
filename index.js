import express from "express";

import cors from "cors";

import UserRoute from "./src/Routes/user.route.js";
import EmpresaRoute from "./src/Routes/empresa.route.js";

import UserAutenticacao from "./src/Routes/autenticacao.user.route.js";
import EmpresaAutenticacao from "./src/Routes/autenticacao.route.js";

import CreatePedidosCreateViewAll from "./src/Routes/create.pedido.route.js";

import PedidosAceitosRouter from "./src/Routes/pedidos.aceitos.route.js";
import PedidosAceitosParaEmpresas from "./src/Routes/pedidos.aceitos.route.js";

import HistoricoPedidos from "./src/Routes/historico.pedidos.route.js";

import BackupOrderRouter from "./src/Routes/backupOrder.route.js";

import ConnectMongoDB from "./src/Database/db.js";
import dotenv from "dotenv";

import swaggerRoute from "./src/Routes/swagger.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

let dbName = 'DB_FOR_YOU_ENTREGAS'; 

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors());

ConnectMongoDB(dbName);

app.use(express.json());

app.use("/documentation", swaggerRoute);

app.use("/user", UserRoute);
app.use("/empresa", EmpresaRoute);

app.use("/autenticacao-empresa", EmpresaAutenticacao);
app.use("/autenticacao-user", UserAutenticacao);

app.use("/pedido", CreatePedidosCreateViewAll);

app.use("/aceitar-pedido-user", PedidosAceitosRouter);
app.use("/pedidos-aceito", PedidosAceitosParaEmpresas);

app.use("/historico-pedido", HistoricoPedidos);

app.use("/order-to-backup", BackupOrderRouter);

app.listen(4000, () => console.log(`Servidor rodando na porta ${port}`));
