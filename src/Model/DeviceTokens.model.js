import mongoose from "mongoose";

const DeviceTokensSchema = new mongoose.Schema({
    token: { type: String, require: true}
});

const TokensDevice = mongoose.model(
  "TokensDevices",
  DeviceTokensSchema
);

export default TokensDevice;