import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { goBack } from '../../../assets/svgs';

export default class XLNav4 extends React.Component {

    static contextType = NavigationContext;

    render() {
        return (
            <View>
                <StatusBar backgroundColor={"transparent"} translucent={true} />
                <View
                    style={{
                        height: 60,
                        paddingTop: 30
                    }}>
                    <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={this.context.goBack} style={{ marginLeft: 5 }}>
                            <SvgXml xml={goBack} width={20} height={20} />
                        </TouchableOpacity>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>{this.props.title}</Text>
                        <Text
                            onPress={this.props.submitIdea || function () { }}
                            style={{ color: '#fff', fontSize: 16, width: 80, fontWeight: '700', textAlign: 'center' }}>{this.props.funcText}</Text>
                    </View>
                </View>
            </View>
        )
    }
}