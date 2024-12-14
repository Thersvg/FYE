import IDplan from "../Model/PlanoMP.model.js";

const CreateStorageIDService = (body) => IDplan.create(body);

const FindIDService = () => IDplan.find();

export default {
    CreateStorageIDService,
    FindIDService
}