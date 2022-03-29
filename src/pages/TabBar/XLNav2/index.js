import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { StatusBar } from 'react-native';
import { NavigationContext } from '@react-navigation/native';

export default class XLNav2 extends React.Component {

    static contextType = NavigationContext;

    render() {
        return (
            <View>
                <StatusBar backgroundColor={"transparent"} translucent={true} />
                <ImageBackground
                    source={require('../../../assets/images/second.jpg')}
                    style={{
                        height: 60,
                        paddingTop: 30
                    }}>
                    <View style={{ flexDirection: 'row', alignContent: 'center',justifyContent:'space-between' }}>
                        <Text onPress={this.context.goBack} style={{ color: '#fff', fontSize:16,width:80,fontWeight:'700'}}>&lt;返回</Text>
                        <Text style={{ color: '#fff', fontSize:16,fontWeight:'700'}}>{this.props.title}</Text>
                        <Text 
                        onPress={this.props.submitIdea || function(){}}
                        style={{color: '#fff', fontSize:16,width:80,fontWeight:'700',textAlign:'center'}}>{this.props.funcText}</Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}