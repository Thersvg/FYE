import TokensDevice from "../Model/DeviceTokens.model.js";

const CreateStorageTokenService = (body) => TokensDevice.create(body);

const FindTokenServiceStorage = (token) => TokensDevice.findOne({token: token});

export default {
    CreateStorageTokenService,
    FindTokenServiceStorage,
}