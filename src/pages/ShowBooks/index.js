import React from 'react';
import { FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NavigationContext } from '@react-navigation/native';

export default class ShowBooks extends React.Component {

    static contextType = NavigationContext;

    state = {
        data: []  //图书数组
    }

    // 图书接口的参数
    params = {
        catalog_id: this.props.catalog_id,//目录编号
        pn: 1,//数据返回起始
        rn: 30,//数据返回条数，最大30
    }

    // 异步加载分页的节流阀
    isLoading = false;

    componentDidMount() {
        this.getBookList();
    }

    // 获取图书信息1
    getBookList = async () => {
        const { catalog_id, pn, rn } = this.params;
        await axios.get("http://apis.juhe.cn/goodbook/query?key=05804bde0fdb4e5372d65b2d67275d25&catalog_id=" + catalog_id + "&pn=" + pn + "&rn=" + rn).then(res => {
            this.setState({ data: res.data.result.data });
        })
    }

    // 获取图书信息2
    getBookList2 = async () => {
        const { catalog_id, pn, rn } = this.params;
        const { data } = this.state;
        await axios.get("http://apis.juhe.cn/goodbook/query?key=05804bde0fdb4e5372d65b2d67275d25&catalog_id=" + catalog_id + "&pn=" + pn + "&rn=" + rn).then(res => {
            this.setState({ data: [...data, ...res.data.result.data] });
        })
    }

    // 滚轮触底事件
    onEndReached = async () => {
        if (this.isLoading) {
            return;
        } else {
            this.isLoading = true;
            this.params.pn++;
            this.getBookList2();
        }
        this.isLoading = false;
    }

    render() {
        const { data } = this.state;
        return (
            <View>
                <>
                    <FlatList
                        numColumns={3}
                        keyExtractor={Math.random}
                        onEndReachedThreshold={0.1}
                        onEndReached={this.onEndReached}
                        data={data}
                        renderItem={({ item }) => <View>
                            <TouchableOpacity style={{ marginLeft: 20, marginBottom: 20, width: 100 }}
                                onPress={() => {
                                    this.context.navigate("Detials",{
                                        item
                                    })
                                }}
                            >
                                <Image source={{ uri: item.img }}
                                    style={{ width: 100, height: 150 }}
                                />
                                <Text style={{ fontWeight: '700' }}>{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                        }

                    />
                </>
            </View>
        );
    }
}