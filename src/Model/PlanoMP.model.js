import mongoose from "mongoose";

const PlanIDSchema = new mongoose.Schema({
    PlanID: { type: String, require: true, unique: true}
});

const IDplanMP = mongoose.model(
  "IDdoPlan",
  PlanIDSchema
);

export default IDplanMP;