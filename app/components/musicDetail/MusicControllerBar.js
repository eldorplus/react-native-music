import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    PanResponder,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MODE from '../../Data/Mode'; //播放模式，包含正常、随机、循环

export default class MusicControllerBar extends Component {
    render() {
        const {
            onPlay,
            onStop,
            isPlay,
            onPlayNext,
            onPlayBack,
            mode,
            onSetCycle,
            onSetRandom,
            } = this.props;
        return (
            <View style={styles.music_controller_bar}>
                <Icon.Button
                    name="random"
                    size={16}
                    backgroundColor="transparent"
                    color={mode==MODE.RANDOM?'white':'#aaa'}
                    style={{justifyContent:'center'}}
                    iconStyle={{marginRight:0}}
                    onPress={onSetRandom}/>
                <View style={styles.center_controller}>
                    <Icon.Button
                        name="backward"
                        size={22}
                        color="white"
                        backgroundColor="transparent"
                        style={{justifyContent:'center'}}
                        iconStyle={{marginRight:0}}
                        onPress={onPlayBack}/>
                    <View style={styles.center_play_button}>
                        {isPlay &&
                        <Icon.Button
                            name="pause"
                            size={26}
                            color="white"
                            backgroundColor="transparent"
                            style={{justifyContent:'center'}}
                            iconStyle={{marginRight:0}}
                            onPress={onStop}/>
                        }
                        {!isPlay &&
                        <Icon.Button
                            name="play"
                            size={26}
                            color="white"
                            backgroundColor="transparent"
                            style={{justifyContent:'center'}}
                            iconStyle={{marginRight:0}}
                            onPress={onPlay}/>
                        }
                    </View>
                    <Icon.Button
                        name="forward"
                        size={22}
                        color="white"
                        backgroundColor="transparent"
                        style={{justifyContent:'center'}}
                        iconStyle={{marginRight:0}}
                        onPress={onPlayNext}/>
                </View>
                <Icon.Button
                    name="circle-o-notch"
                    size={16}
                    backgroundColor="transparent"
                    color={mode==MODE.CYCLE?'white':'#aaa'}
                    style={{justifyContent:'center'}}
                    iconStyle={{marginRight:0}}
                    onPress={onSetCycle}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    music_controller_bar: {
        height: 100,
        paddingLeft: 6,
        paddingRight: 6,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)'
    },
    center_controller: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    center_play_button: {
        width: 60,
        height: 60,
        borderRadius: 60,
        marginLeft: 16,
        marginRight: 16,
        backgroundColor: 'rgb(36,147,110)',
        justifyContent: 'center',
        alignItems: 'center'
    },
})
