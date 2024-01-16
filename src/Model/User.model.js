import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name_entregador: { type: String, require: true },
  cpf_entregador: { type: String, require: true, unique: true },
  password_entregador: { type: String, require: true, select: false },
  email_entregador: { type: String, require: true },
  formaDepagamento_entregador: { type: String, require: true },
});

UserSchema.pre("save", async function (next) {
  this.password_entregador = await bcrypt.hash(this.password_entregador, 10);
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
