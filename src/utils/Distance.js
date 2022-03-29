export default{
    // 根据经纬度计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
	getDistance(lat1, lng1, lat2, lng2) {
		var distance_str = "";
		// 四个值都存在进行距离计算
		if (lat1 != undefined && lng1 != undefined && lat2 != null && lng2 != null) {
			lat2 = lat2 * 1
			lng2 = lng2 * 1
			var radLat1 = rad(lat1);
			var radLat2 = rad(lat2);
			var a = radLat1 - radLat2;
			var b = rad(lng1) - rad(lng2);
			var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
				Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
			s = s * 6378.137; // EARTH_RADIUS;
			s = Math.round(s * 10000) / 10000; //输出为公里
			var distance = s;
			if (distance) {
				if (parseInt(distance) >= 1) {
					distance_str = distance.toFixed(1) + "km";
				} else {
					distance_str = distance * 1000 + "m";
				}
			}
		}
		return distance_str;
	} 

}