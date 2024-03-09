import mongoose from "mongoose";

const ConnectMongoDB = (dbName) => {

  const uri = process.env.MONGOODB_URL + `${dbName}`;

  console.log(uri);

  console.log("Esperando conexão com o Banco de dados");

  mongoose
    .connect(uri)
    .then(() => console.log("Conectado ao Banco de Dados Mongo Atlas"))
    .catch((error) => console.log("Erro Banco de dados nao conectado", error));
};

export default ConnectMongoDB; 