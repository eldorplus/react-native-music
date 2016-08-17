'use strict';

import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
//第三方组件

import Icon from 'react-native-vector-icons/FontAwesome';
//组件
import Navbar from '../components/MusicDetail/Navbar';
import MusicContainer from '../components/MusicDetail/MusicContainer';
import MusicControllerLine from '../components/MusicDetail/MusicControllerLine';
import MusicControllerBar from '../components/MusicDetail/MusicControllerBar';
import Utils from'../utils/Utils';

import MusicList from '../components/MusicDetail/MusicList';

//模拟数据
import MODE from '../Data/Mode'; //播放模式，包含正常、随机、循环

export default class MusicDetailPage extends Component {
    // 构造
    constructor(props) {
        super(props);
    }

    render() {
        const {
            actions,
            route,
            playmusic,
            onCircleMove,
            onStop,
            onPlay,
            onPlayNext,
            onPlayBack,
            onSetRandom,
            onSetCycle,
            } = this.props;
        const {
            currentTime,
            overallLength,
            isPlay,
            currentIndex,
            musicHash,
            mode,
            musicList,
            showMusicList
            } = playmusic;

        const music = musicList[currentIndex];//当前播放音乐
        return (
            <View style={styles.smart_home_container}>
                <Navbar actions={actions}/>
                <MusicContainer songImg={music['songImg']}
                                songName={music['songName']}
                                songAuthor={music['songAuthor']}
                    />
                <MusicControllerLine currentTime={currentTime}
                                     overallLength={overallLength}
                                     onCircleMove={onCircleMove}
                                     onStop={onStop}
                    />
                <MusicControllerBar onPlay={onPlay}
                                    onStop={onStop}
                                    isPlay={isPlay}
                                    onPlayNext={onPlayNext}
                                    onPlayBack={onPlayBack}
                                    onSetRandom={onSetRandom}
                                    onSetCycle={onSetCycle}
                                    mode={mode}
                    />
                {showMusicList &&
                <MusicList actions={actions}
                           onPlayNext={onPlayNext}/>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
        smart_home_container: {
            flex: 1,
            backgroundColor: '#5E5898',
            flexDirection: 'column'
        },
    }
);