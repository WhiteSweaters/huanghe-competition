import React from 'react';
import { View, Text } from 'react-native';
import { MapType, MapView, Marker } from 'react-native-amap3d/lib/src';
import Geo from '../../utils/Geo';

export default class Demo extends React.Component {

    render() {

        return (
            <MapView
                myLocationEnabled={true}
                myLocationButtonEnabled
                zoomControlsEnabled
                distanceFilter={10}
                initialCameraPosition={{
                    target: {
                        latitude: 30.515544,
                        longitude: 114.372898
                    },
                    zoom: 17
                }}
            >
                <Marker
                    active title='这是一个标注点' color='red' description='Hello world!' coordinate={{ latitude: 30.515544, longitude: 114.372898, }} />
            </MapView >
        );
    }
}