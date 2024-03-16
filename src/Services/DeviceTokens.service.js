import TokensDevice from "../Model/DeviceTokens.model.js";

const CreateStorageTokenService = (body) => TokensDevice.create(body);

const FindTokenServiceStorage = () => TokensDevice.find();

export default {
    CreateStorageTokenService,
    FindTokenServiceStorage,
}