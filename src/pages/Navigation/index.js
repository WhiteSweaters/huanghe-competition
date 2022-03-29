import React from 'react';
import { View, Text } from 'react-native';
import { MapType, MapView, Marker } from 'react-native-amap3d/lib/src';
import Geo from '../../utils/Geo';

export default class Navigation extends React.Component {



    render() {

        return (
            <MapView
                myLocationEnabled={true}
                myLocationButtonEnabled
                zoomControlsEnabled
                mapType={MapType.Navi}
                distanceFilter={10}
                initialCameraPosition={{
                    target: {
                        latitude: 30.518854, longitude: 114.36088
                    },
                    zoom: 15
                }}
            >
                <Marker
                    position={{ latitude: 30.518854, longitude: 114.36088 }}
                    icon={require('../../assets/images/hospital.png')}
                />
            </MapView >
        );
    }
}