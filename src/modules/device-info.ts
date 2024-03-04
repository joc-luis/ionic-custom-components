import {KindDeviceEnum} from "../enums/kind-device.enum.ts";
import {Device} from "@capacitor/device";

export class DeviceInfo {
    public static async kind(): Promise<KindDeviceEnum> {
        switch ((await Device.getInfo()).platform) {
            case "android":
                return KindDeviceEnum.android
            case "ios":
                return KindDeviceEnum.ios;
            case "web":
                return KindDeviceEnum.browser
            default:
                throw new Error("Platform is not supported")
        }
    }
}