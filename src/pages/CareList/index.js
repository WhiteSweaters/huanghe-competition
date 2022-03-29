import axios from 'axios';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, ToastAndroid } from 'react-native';
import { BASE_URL } from '../../utils/BaseUrl';
import { NavigationContext } from '@react-navigation/native';
import XLNav from '../TabBar/XLNav';

@inject("RootStore")
@observer
export default class CareList extends React.Component {

    static contextType = NavigationContext;

    state = {
        nickname: '',
        data: []
    }

    componentDidMount() {
        this.getBeCaredOfUsers(this.props.RootStore.uid);
    }

    getBeCaredOfUsers = async (uid) => {
        await axios.get(BASE_URL + "/user/getBeCaredOfUsers/" + uid).then(res => {
            if (res.data.status) {
                ToastAndroid.show(res.data.errMsg, 2000);
                this.setState({ data: res.data.data });
            } else {
                ToastAndroid.show(res.data.errMsg, 2000);
                return;
            }
        })
    }


    handleChage = e => {
        this.setState({ nickname: e });
    }

    searchUserByNickname = async () => {
        const { nickname } = this.state;
        await axios.get(BASE_URL + "/user/searchUserByNickname/" + nickname).then(res => {
            if (res.data.status) {
                ToastAndroid.show(res.data.errMsg, 2000);
                this.setState({ data: res.data.data });
            } else {
                ToastAndroid.show(res.data.errMsg, 2000);
                return;
            }
        })
    }


    render() {
        const { nickname, data } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <XLNav title={"关注列表"}/>
                <TextInput
                    inlineImageLeft='search'
                    style={{
                        width: '80%', backgroundColor: '#eee', height: 45, alignSelf: 'center',
                        marginTop: 7, borderRadius: 5
                    }}
                    value={nickname}
                    onChangeText={this.handleChage}
                    onSubmitEditing={this.searchUserByNickname}
                />
                <>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <TouchableOpacity style={{
                            width: '100%', height: 60, marginTop: 10, flexDirection: 'row'
                        }}
                            onPress={() => {
                                this.context.navigate("Others",{
                                    uid:item.id
                                });
                            }}>
                            {/* 左边部分图标区域  开始 */}
                            <View>
                                <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: item.headerImage }} />
                            </View>
                            {/* 左边部分图标区域  结束 */}

                            {/* 右边部分描述区域  开始 */}
                            <View style={{
                                marginLeft: 20, justifyContent: 'center', borderBottomColor: '#ccc', borderBottomWidth: 0.5,
                                width: 400
                            }}>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '700' }}>{item.nickname}</Text>
                                </View>
                                <View>
                                    <Text style={{ marginTop: 5 }}>{item.motto}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>}
                        keyExtractor={Math.random}
                    />
                </>
            </View>
        );
    }
}