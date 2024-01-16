import mongoose from "mongoose";

const ConnectMongoDB = () => {
  console.log("Esperando conexão com o Banco de dados");
  mongoose
    .connect(process.env.MONGOODB_URL)
    .then(() => console.log("Conectado ao Banco de Dados Mongo Atlas"))
    .catch((error) => console.log("Erro Banco de dados nao conectado", error));
};

export default ConnectMongoDB;
