import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

export default class MovieList extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#000', position: 'relative' }}>
                {/* 播放短视频  开始 */}
                <Video
                    source={{uri:'http://whitesweater.info/test2.mp4'}}
                    ref={(ref) => {
                        this.player = ref
                    }}
                    onBuffer={this.onBuffer}
                    onError={this.videoError}
                    style={styles.backgroundVideo}
                    resizeMode={'contain'}
                />
                {/* 播放短视频  结束 */}

                {/* 短视频文案  开始 */}
                <View style={{ position: 'absolute', top: 600, padding: 20 }}>
                    <Text style={{ color: '#fff' }}>人生就像是一盒巧克力，你永远都不知道接下来是什么口味。</Text>
                </View>
                {/* 短视频文案  结束 */}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: '5%',
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%'
    },
});