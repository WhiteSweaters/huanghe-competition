import { PermissionsAndroid, Platform } from "react-native";
import { init, addLocationListener, start, stop, Geolocation } from "react-native-amap-geolocation";
import axios from 'axios';

export default{
  async getCurrentStreet(){
    if (Platform.OS === "android") {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    } else {
      setLocatingWithReGeocode(true)
      
    }
    await init({
      android: "a886b43e7d9981b20544442499145cc5"
    });

    const res = await this.getCurrentPosition();
    const res1 = await axios.get("https://restapi.amap.com/v3/geocode/regeo?location=" + res.longitude + "," + res.latitude + "&key=46bdf7337332ad2d701d5ed6d891bb05");
    return res1.data;
  },

  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      console.log("开始定位");
      Geolocation.getCurrentPosition(({ coords }) => {
        resolve(coords);
      }, reject);
    })
  }
}