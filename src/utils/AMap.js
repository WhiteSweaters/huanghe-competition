import { AMapSdk } from "react-native-amap3d";
import { Platform } from "react-native";

export default {
    async init() {
        AMapSdk.init(
            Platform.select({
                android:'a886b43e7d9981b20544442499145cc5'
            })
        )
    }
}