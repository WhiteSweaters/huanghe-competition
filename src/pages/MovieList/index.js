import React from 'react';
import { ImageBackground, StatusBar, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import dateToString from '../../utils/dateToString';

export default class MovieList extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar backgroundColor={'transparent'} translucent={true} />
                <Swiper>
                    <ImageBackground source={require('../../assets/images/gump.png')}
                        style={{ width: '100%', height: '100%', position: 'relative' }}
                        imageStyle={{ width: '100%', height: '100%' }}
                    >
                        <Text style={{
                            position: 'absolute', bottom: 150, color: '#fff',
                            fontWeight: '700', marginHorizontal: 30, fontSize: 16
                        }}>阿甘正传</Text>
                        <Text style={{
                            position: 'absolute', bottom: 100, color: '#fff',
                            marginHorizontal: 30, fontSize: 14, lineHeight: 20
                        }}>
                            也许我们这些聪明人,脑袋里能装的目标太多,所以忘了执着。
                        </Text>
                        <Text style={{
                            position: 'absolute', bottom: 70, color: '#fff',
                            marginHorizontal: 30, fontSize: 12, lineHeight: 20
                        }}>{dateToString.dateToString(new Date())}</Text>
                    </ImageBackground>
                    <View>
                        <ImageBackground source={require('../../assets/images/gump.png')}
                            style={{ width: '100%', height: '100%', position: 'relative' }}
                            imageStyle={{ width: '100%', height: '100%' }}
                        >
                            <Text style={{
                                position: 'absolute', bottom: 150, color: '#fff',
                                fontWeight: '700', marginHorizontal: 30, fontSize: 16
                            }}>阿甘正传</Text>
                            <Text style={{
                                position: 'absolute', bottom: 100, color: '#fff',
                                marginHorizontal: 30, fontSize: 14, lineHeight: 20
                            }}>
                                也许我们这些聪明人,脑袋里能装的目标太多,所以忘了执着。
                            </Text>
                            <Text style={{
                                position: 'absolute', bottom: 70, color: '#fff',
                                marginHorizontal: 30, fontSize: 12, lineHeight: 20
                            }}>{dateToString.dateToString(new Date())}</Text>
                        </ImageBackground>
                    </View>
                    <View>
                        <ImageBackground source={require('../../assets/images/gump.png')}
                            style={{ width: '100%', height: '100%', position: 'relative' }}
                            imageStyle={{ width: '100%', height: '100%' }}
                        >
                            <Text style={{
                                position: 'absolute', bottom: 150, color: '#fff',
                                fontWeight: '700', marginHorizontal: 30, fontSize: 16
                            }}>阿甘正传</Text>
                            <Text style={{
                                position: 'absolute', bottom: 100, color: '#fff',
                                marginHorizontal: 30, fontSize: 14, lineHeight: 20
                            }}>
                                也许我们这些聪明人,脑袋里能装的目标太多,所以忘了执着。
                            </Text>
                            <Text style={{
                                position: 'absolute', bottom: 70, color: '#fff',
                                marginHorizontal: 30, fontSize: 12, lineHeight: 20
                            }}>{dateToString.dateToString(new Date())}</Text>
                        </ImageBackground>
                    </View>
                </Swiper>
            </View>
        );
    }
}