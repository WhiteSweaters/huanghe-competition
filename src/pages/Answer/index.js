import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

export default class Answer extends React.Component {

    state = {
        toAnswer: false
    }

    // 答案之书
    renderBook = () => {
        return <ImageBackground source={require('../../assets/images/black.png')} style={{
            width: '100%', height: 1500, position: 'relative'
        }}>
            <View>
                <Text style={{
                    color: '#ccc', fontWeight: '700', position: 'absolute',
                    top: 300, padding: 20, alignSelf: 'center', fontSize: 18
                }}>在你充满疑惑，不知该如何是好时</Text>
                <Text style={{
                    color: '#ccc', fontWeight: '700', position: 'absolute',
                    top: 330, padding: 20, alignSelf: 'center', fontSize: 18
                }}>或许答案就在这本书中......</Text>

                <TouchableOpacity style={{
                    position: 'absolute', width: 200, height: 50,
                    backgroundColor: 'orange', top: 420, alignSelf: 'center',
                    justifyContent: 'center', alignItems: 'center', borderRadius: 8
                }}
                    onPress={() => {
                        this.setState({ toAnswer: true });
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>开始寻找</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    }

    // 答案
    renderAnswer = () => {
        return <ImageBackground source={require('../../assets/images/black.png')} style={{
            width: '100%', height: 1500, position: 'relative'
        }}>
            <View>
                <Text style={{
                    color: '#ccc', position: 'absolute',
                    top: 100, padding: 20, alignSelf: 'center', fontSize: 14
                }}>请在心中冥想三遍问题</Text>
                <Text style={{
                    color: '#ccc', position: 'absolute',
                    top: 130, padding: 20, alignSelf: 'center', fontSize: 14
                }}>点击翻看答案</Text>
               
                <TouchableOpacity style={{
                    position: 'absolute', width: 200, height: 50,
                    backgroundColor: 'orange', top: 500, alignSelf: 'center',
                    justifyContent: 'center', alignItems: 'center', borderRadius: 8
                }}
                    onPress={() => {
                       this.props.navigation.navigate("AnswerList")
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>答案</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    }

    render() {
        const { toAnswer } = this.state;
        return (
            <View>
                {toAnswer ? this.renderAnswer() : this.renderBook()}
            </View>
        )
    }
}