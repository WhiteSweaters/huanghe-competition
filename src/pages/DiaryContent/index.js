import React from 'react';
import { Text, View, ImageBackground, StyleSheet, StatusBar } from 'react-native';
import Textarea from 'react-native-textarea/src/Textarea';
import dateToString from '../../utils/dateToString';


export default class DiaryContent extends React.Component {
    render() {
        const{ date, weather, content,title} = this.props.route.params.item;
        return (
            <View>
                <StatusBar backgroundColor={'transparent'} translucent={true} />
                <ImageBackground
                    source={require('../../assets/images/diary.jpg')}
                    style={{
                        width: '100%', height: '100%', justifyContent: 'center',
                        alignItems: 'center', position: 'relative'
                    }}
                >
                    <View style={{ width: '90%', height: 700, backgroundColor: '#fff', borderRadius: 8 }}>

                        {/* 时间  开始 */}
                        <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#af978d' }}>{date} | {weather}</Text>
                            <Text style={{ color: '#af978d' }}>{dateToString.weekDay(date)}</Text>
                        </View>
                        {/* 时间  结束 */}

                        {/* 日记标题  开始 */}
                        <View style={{ paddingHorizontal: 20 }}>
                            <Text style={{ color: '#af978d' }}>标题：{title}</Text>
                        </View>
                        {/* 日记标题  结束 */}

                        {/* 用户输入日记内容  开始 */}
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={this.onChangeContent}
                            defaultValue={content}
                            maxLength={1000}
                            placeholder={'开始输入...'}
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                        />
                        {/* 用户输入日记内容  结束 */}
                    </View>
                </ImageBackground>
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
        height: 580,
        padding: 20,
        backgroundColor: '#fff',

    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#af978d',
    },
});