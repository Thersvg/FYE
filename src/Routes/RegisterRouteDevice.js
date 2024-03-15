import { Router } from "express";
const Device = Router();

import DeviceController from "../Controller/RegisterControllerDevice";

Device.post('/', DeviceController.NotificationDeviceToken);

export default Device;