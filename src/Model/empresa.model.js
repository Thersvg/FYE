import mongoose from "mongoose";
import bcrypt from "bcrypt";

const EmpresaSchema = new mongoose.Schema({
  name_empresa: { type: String, require: true },
  cnpj_empresa: { type: String, require: true, unique: true },
  password_empresa: { type: String, require: true, select: false },
  email_empresa: { type: String, require: true },
  endereco_empresa: { type: String, require: true },
  telefone_empresa: { type: String, require: true },
  logo_empresa: Buffer,
  taxa_entrega_empresa: { type: String, require: true },
});

EmpresaSchema.pre("save", async function (next) {
  this.password_empresa = await bcrypt.hash(this.password_empresa, 10);
  next();
});

const Empresa = mongoose.model("Empresa", EmpresaSchema);

export default Empresa;
