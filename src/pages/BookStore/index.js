import { NavigationContext } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { BASE_URL } from '../../utils/BaseUrl';
import XLNav from '../TabBar/XLNav';


export default class BookStore extends React.Component {

    static contextType = NavigationContext;

    state = {
        data: [],
        name: '好好生活家',
        changePage: 1
    }

    componentDidMount() {
        const { name } = this.state;
        this.getBookList(name);
    }

    // 获取图书信息
    getBookList = async (name) => {
        await axios.get(BASE_URL + "/user/getBookList/" + name).then(res => {
            this.setState({
                data: res.data.data
            })
        })
    }

    render() {
        const { data, changePage } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <XLNav title={"书架"} />

                {/* 顶部导航栏  开始 */}
                <View style={{
                    width: '100%', height: 50, alignItems: 'center',
                    flexDirection: 'row', borderBottomColor: '#ddd'
                }}>
                    {/* 好好生活家  开始 */}
                    <TouchableOpacity style={{
                        width: 80, height: 30, borderWidth: 1, borderColor: '#339999',
                        justifyContent: 'center', alignItems: 'center', borderRadius: 3, marginLeft: 10,
                        backgroundColor: changePage === 1 ? '#339999' : 'transparent'
                    }}
                        onPress={() => {
                            this.setState({
                                changePage: 1,
                            })
                            this.getBookList("好好生活家")
                        }}
                    >
                        <Text style={{ color: changePage === 1 ? '#fff' : '#339999', fontSize: 12 }}>好好生活家</Text>
                    </TouchableOpacity>
                    {/* 好好生活家  结束 */}

                    {/* 待更新  开始 */}
                    <TouchableOpacity style={{
                        width: 50, height: 30, borderWidth: 1, borderColor: '#339999',
                        justifyContent: 'center', alignItems: 'center', borderRadius: 3, marginLeft: 10,
                        backgroundColor: changePage === 2 ? '#339999' : 'transparent'

                    }}
                        onPress={() => {
                            this.setState({
                                changePage: 2,
                            })
                            this.getBookList("待更新")
                        }}
                    >
                        <Text style={{ color: changePage === 2 ? '#fff' : '#339999', fontSize: 12 }}>待更新</Text>
                    </TouchableOpacity>
                    {/* 待更新  结束 */}

                </View>
                {/* 顶部导航栏  结束 */}


                <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 30, paddingTop: 20 }}>

                    {data.map((value, index) => <TouchableOpacity key={index}
                        style={{
                            width: 100, height: 200,
                            marginRight: 15, marginTop: 10
                        }}
                        onPress={() => {
                            this.context.navigate("Detials", {
                                item: value
                            })
                        }}
                    >
                        <Image source={{ uri: value.image }} style={{ width: '100%', height: 150 }} />
                        <Text>{value.title}</Text>
                    </TouchableOpacity>)}
                </View>

            </View>
        );
    }

}