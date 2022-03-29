import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ToastAndroid } from 'react-native';

import Sound from 'react-native-sound';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import XLNav from '../../XLNav';
import { Button } from 'react-native-elements/dist/buttons/Button';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import { BASE_URL } from '../../../../utils/BaseUrl';
import ImagePicker from 'react-native-image-crop-picker'
import { readFile } from 'react-native-fs';

const baseUrl = BASE_URL;
@inject("RootStore")
@observer
export default class Recording extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: undefined, //授权状态
            audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac', // 文件路径
            recording: false, //是否录音
            pause: false, //录音是否暂停
            stop: false, //录音是否停止
            currentTime: 0, //录音时长
            title: '',  //作品标题
            copy: '',   //作品文案
            file: '',   //音频文件的base64
            cover: ''    //作品封面的base64
        };
    }

    componentDidMount() {
        // 请求授权
        AudioRecorder.requestAuthorization()
            .then(isAuthor => {
                console.log('是否授权: ' + isAuthor)
                if (!isAuthor) {
                    return alert('请前往设置开启录音权限')
                }
                this.setState({ hasPermission: isAuthor })
                this.prepareRecordingPath(this.state.audioPath);
                // 录音进展
                AudioRecorder.onProgress = (data) => {
                    this.setState({ currentTime: Math.floor(data.currentTime) });
                };
                // 完成录音
                AudioRecorder.onFinished = (data) => {
                    // data 返回需要上传到后台的录音数据
                    console.log(this.state.currentTime)
                    console.log(data)
                    this.setState({ file: data });

                };
            })
    };

    /**
     * AudioRecorder.prepareRecordingAtPath(path,option)
     * 录制路径
     * path 路径
     * option 参数
     */
    prepareRecordingPath = (path) => {
        const option = {
            SampleRate: 44100.0, //采样率
            Channels: 2, //通道
            AudioQuality: 'High', //音质
            AudioEncoding: 'aac', //音频编码
            OutputFormat: 'mpeg_4', //输出格式
            MeteringEnabled: false, //是否计量
            MeasurementMode: false, //测量模式
            AudioEncodingBitRate: 32000, //音频编码比特率
            IncludeBase64: true, //是否是base64格式
            AudioSource: 0, //音频源
        }
        AudioRecorder.prepareRecordingAtPath(path, option)
    }

    // 开始录音
    _record = async () => {
        if (!this.state.hasPermission) {
            return alert('没有授权')
        }
        if (this.state.recording) {
            return alert('正在录音中...')
        }
        if (this.state.stop) {
            this.prepareRecordingPath(this.state.audioPath)
        }
        this.setState({ recording: true, pause: false })

        try {
            await AudioRecorder.startRecording()
        } catch (err) {
            console.log(err)
        }
    }

    // 暂停录音
    _pause = async () => {
        if (!this.state.recording) {
            return alert('当前未录音')
        }

        try {
            await AudioRecorder.pauseRecording()
            this.setState({ pause: true, recording: false })
        } catch (err) {
            console.log(err)
        }
    }

    // 恢复录音
    _resume = async () => {
        if (!this.state.pause) {
            return alert('录音未暂停')
        }

        try {
            await AudioRecorder.resumeRecording();
            this.setState({ pause: false, recording: true })
        } catch (err) {
            console.log(err)
        }
    }

    // 停止录音
    _stop = async () => {
        this.setState({ stop: true, recording: false, paused: false });
        try {
            await AudioRecorder.stopRecording();
        } catch (error) {
            console.error(error);
        }
    }

    // 播放录音
    _play = async () => {
        let whoosh = new Sound(this.state.audioPath, '', (err) => {
            if (err) {
                return console.log(err)
            }
            whoosh.play(success => {
                if (success) {
                    console.log('success - 播放成功')
                } else {
                    console.log('fail - 播放失败')
                }
            })
        })
    }

    // 输入标题与React组件实现双向绑定
    handleChangeTitle = (e) => {
        this.setState({ title: e });
    }

    // 输入文案与React组件实现双向绑定
    handleChangeCopy = (e) => {
        this.setState({ copy: e });
    }

    // 上传作品封面
    submitCover = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 300,
            cropping: true
        }).then(image => {
            readFile(image.path, 'base64').then(res => {
                ToastAndroid.show("封面上传成功", 2000);
                this.setState({ cover: res });
            })
        });
    }

    // 上传表单数据
    submitAudio = () => {
        if (this.state.title.length === 0 || this.state.copy.length === 0) {
            ToastAndroid.show("尚未填写标题或文案", 2000);
        }
        AudioRecorder.onFinished = (data) => {
            // data 返回需要上传到后台的录音数据
            console.log(this.state.currentTime)
            console.log(data)
            this.setState({ file: data });

        };
        axios.post(baseUrl + '/radio/uploadRadio', {
            title: this.state.title,
            copy: this.state.copy,
            file: this.state.file,
            uid: this.props.RootStore.uid + '',
            cover: this.state.cover,
            currentTime: this.state.currentTime + ''
        }).then(res => {
            console.log(res);
            // 清空表单
            this.setState({
                title: '',
                copy: '',
                file: ''
            });
        });
    }



    render() {
        let { recording, pause, currentTime } = this.state
        return (
            <View>
                <XLNav title={"分享你的故事"} />
                <View style={{ alignSelf: 'center', marginTop: '20%' }}>
                    <Button title={'开始录音'} buttonStyle={{ width: 120, backgroundColor: '#333', height: 40, borderRadius: 20 }} onPress={this._record} />
                    <Button title={'暂停录音'} buttonStyle={{ width: 120, backgroundColor: '#333', height: 40, borderRadius: 20, marginTop: 20 }} onPress={this._pause} />
                    <Button title={'恢复录音'} buttonStyle={{ width: 120, backgroundColor: '#333', height: 40, borderRadius: 20, marginTop: 20 }} onPress={this._resume} />
                    <Button title={'停止录音'} buttonStyle={{ width: 120, backgroundColor: '#333', height: 40, borderRadius: 20, marginTop: 20 }} onPress={this._stop} />
                    <Button title={'播放录音'} buttonStyle={{ width: 120, backgroundColor: '#333', height: 40, borderRadius: 20, marginTop: 20 }} onPress={this._play} />
                    <Text style={styles.text}>
                        {
                            recording ? '正在录音' :
                                pause ? '已暂停' : '未开始'
                        }
                    </Text>
                    <Text style={styles.text}>时长: {currentTime}</Text>
                </View>
                <View style={{ width: '80%', paddingLeft: 60 }}>
                    <TextInput
                        style={{
                            borderBottomWidth: 2,
                            borderBottomColor: '#ccc',
                            fontSize: 20,
                            width: '100%'
                        }}
                        placeholder={'输入标题'}
                        keyboardType="default"
                        value={'' + this.state.title}
                        onChangeText={e => this.handleChangeTitle(e)}
                    />
                    <TextInput
                        style={{
                            borderBottomWidth: 2,
                            borderBottomColor: '#ccc',
                            fontSize: 20,
                            width: '100%'
                        }}
                        placeholder={'写入文案'}
                        keyboardType="default"
                        value={'' + this.state.copy}
                        onChangeText={e => this.handleChangeCopy(e)}
                    />

                    <Button title={'上传封面'} buttonStyle={{ width: 120, backgroundColor: '#333', height: 40, borderRadius: 20, marginTop: 20, alignSelf: 'center' }}
                        onPress={this.submitCover}
                    />

                    <Button title={'点击分享'} buttonStyle={{ width: 120, backgroundColor: '#333', height: 40, borderRadius: 20, marginTop: 20, alignSelf: 'center' }}
                        onPress={this.submitAudio}
                    />

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        // fontSize: 18,
        marginVertical: 10,
    }
})