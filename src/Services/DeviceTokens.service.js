import TokensDevice from "../Model/DeviceTokens.model.js";

const CreateStorageTokenService = (body) => TokensDevice.create(body);

export default {
    CreateStorageTokenService,
}