import mongoose from "mongoose";

import { MongoClient, ServerApiVersion } from 'mongodb';

/* const ConnectMongoDB = (dbName) => {

  console.log("Esperando conexão com o Banco de dados");

  mongoose
    .connect(process.env.MONGOODB_URL + `${dbName}`)
    .then(() => console.log("Conectado ao Banco de Dados Mongo Atlas"))
    .catch((error) => console.log("Erro Banco de dados nao conectado", error));
};
 */

const uri = 'mongodb+srv://foryouentregas:34CCQ2RXQHFi6F38@cluster0.dz5xnii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0DB_FOR_YOU_ENTREGAS'

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function ConnectMongoDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export default ConnectMongoDB; 