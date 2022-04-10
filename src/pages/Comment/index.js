import React from 'react';
import { View, ToastAndroid, StyleSheet } from 'react-native';
import XLNav from '../TabBar/XLNav';
import { NavigationContext } from '@react-navigation/native';
import Textarea from 'react-native-textarea';
import axios from 'axios';
import { BASE_URL } from '../../utils/BaseUrl';
import { Button } from 'react-native-elements';


export default class Comment extends React.Component {

    static contextType = NavigationContext;

    state = {
        content: ''
    }

    onChange = e => {
        this.setState({ content: e });
    }

    submitIdea = async () => {
        const { content } = this.state;
        await axios.post(BASE_URL + "/community/uploadComment", {
            cid: this.props.route.params.cid + '',
            uid: this.props.route.params.uid + '',
            content: content
        }).then(res => {
            ToastAndroid.show(res.data.errMsg, 2000);
            this.context.navigate("Community", { isRefresh: true })
        })
    }



    render() {
        return (
            <View>
                <XLNav title={"评论动态"} funcText={"发表"} submitIdea={() => {
                    this.submitIdea();
                    ToastAndroid.show("发布成功", 2000);
                    this.context.goBack();
                }} />

                <Textarea
                    containerStyle={styles.textareaContainer}
                    style={styles.textarea}
                    onChangeText={this.onChange}
                    defaultValue={this.state.content}
                    maxLength={100}
                    placeholder={'友情提示：文明上网，共同打造良好社区环境哦~'}
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                />

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textareaContainer: {
        height: 180,
        padding: 5,
        backgroundColor: '#fff',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
    },
});