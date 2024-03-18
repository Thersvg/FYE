import { Router } from "express";
const Device = Router();

import DeviceTokenController from '../Controller/RegisterControllerDevice.js'

Device.post('/', DeviceTokenController.NotificationDeviceToken);

Device.get('/:token?', DeviceTokenController.FindTokenStorageController);

Device.post('/send', DeviceTokenController.SendMessageToDevices);

export default Device;