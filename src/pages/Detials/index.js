import React from 'react';
import { Image, Linking, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import XLNav from '../TabBar/XLNav';


export default class Details extends React.Component {

    state = {
        item: this.props.route.params.item
    }

    render() {
        const { item } = this.state;
        return (
            <View>
                <XLNav title={item.title} />
                <ScrollView>

                    {/*图书基本信息介绍  开始*/}
                    <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontWeight: '700', fontSize: 20 }}>{item.title}</Text>
                            <Text style={{ marginTop: 10 }}>作者：{item.author}</Text>
                            <Text style={{ marginTop: 10 }}>译者：{item.translator}</Text>
                            <Text style={{ marginTop: 10 }}>出版社：{item.press}</Text>
                            
                        </View>
                        <View style={{}}>
                            <Image style={{ width: 100, height: 150 }}
                                source={{ uri: item.image }} />
                        </View>
                    </View>
                    {/*图书基本信息介绍  结束*/}

                    {/*引言  开始*/}
                    <View style={{ backgroundColor: '#fff', width: '100%', height: 1000, padding: 20 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '700' }}>引言</Text>
                        <Text style={{ textAlign: 'left', marginTop: 10, fontSize: 16 }}>{item.content}</Text>

                        <TouchableWithoutFeedback onPress={() => {
                            Linking.openURL(item.link);
                        }}>
                            <View style={{
                                marginTop: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 300,
                                height: 50,
                                backgroundColor: '#39f',
                                borderRadius: 25,
                                alignSelf: 'center',
                            }}>
                                <Text style={{ fontWeight: '700', fontSize: 20 }}>图书链接</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {/*引言  结束*/}


                </ScrollView>
            </View>
        );
    }
}
