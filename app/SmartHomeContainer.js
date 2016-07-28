'use strict';

import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
} from 'react-native';
//第三方组件

import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
//组件
import Navbar from './components/Navbar';
import MusicContainer from './components/MusicContainer';
import MusicControllerLine from './components/MusicControllerLine';
import MusicControllerBar from './components/MusicControllerBar';
import Utils from'./components/Utils';

import MusicList from './components/MusicList';

//模拟数据
import MUSICLIST from './Data/MusicList';//音乐数据
import MODE from './Data/Mode'; //播放模式，包含正常、随机、循环

export default class SmartHomeContainer extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            musicList: MUSICLIST,
            currentIndex: 0,//当前音乐列表播放索引
            overallLength: '60',//总音乐时长
            currentTime: '0',//当前播放时长
            mode: MODE.NORMAL,//播放模式，默认正常
            musicHash: (new Date()).getTime(),//音乐请求hash,在播放下一首时刷新
            isPlay: false,//播放状态
            showMusicList: false,//显示音乐列表
        }

        //es6 在constructor就进行绑定，可以提高性能
        this._onPlay = this._onPlay.bind(this);
        this._onStop = this._onStop.bind(this);
        this._onPlayNext = this._onPlayNext.bind(this);
        this._onPlayBack = this._onPlayBack.bind(this);
        this._onSetCycle = this._onSetCycle.bind(this);
        this._onSetRandom = this._onSetRandom.bind(this);
        this._onCircleMove = this._onCircleMove.bind(this);
        this._setDuration = this._setDuration.bind(this);
        this._setTime = this._setTime.bind(this);
        this._loadStart = this._loadStart.bind(this);
        this._toggleMusicList = this._toggleMusicList.bind(this);
    }


    /**
     * 播放音乐
     */
    _onPlay() {
        const {currentTime,overallLength} = this.state;
        if (currentTime < overallLength) {
            this.setState({
                isPlay: true,
            });
        }
        //当音乐结束的时候，跳下一首歌
        if (currentTime >= overallLength) {
            this._onPlayNext();
        }
        //每两秒循环检测一次是否需要播放下一首歌
        this.timeout = setTimeout(()=> {
            this._onPlay();
        }, 2000);
    }


    /**
     * 播放下一首
     * 播放下一首歌前，先停止播放，再根据听歌模式选择歌曲索引
     * @private
     */
    _onPlayNext(index) {
        this._onStop();

        const {mode,currentIndex} =this.state;
        let _currentIndex = currentIndex;

        if (index != undefined) {
            _currentIndex = index;
        } else {
            switch (mode) {
                case MODE.NORMAL:
                    //正常模式
                    _currentIndex = this._getNormalNextIndex();
                    break;
                case MODE.CYCLE:
                    //循环模式
                    _currentIndex = this._getCycleIndex();
                    break;
                case MODE.RANDOM:
                    //随机模式
                    _currentIndex = this._getRandomIndex();
                    break;
                default :
                    //正常模式
                    _currentIndex = this._getNormalNextIndex();
                    break;
            }
        }


        this.setState({
            musicHash: (new Date()).getTime(),
            currentIndex: _currentIndex,
            overallLength: '60',
            currentTime: '0',
            isPlay: false,
            showMusicList: false,
        });
        //500毫秒后，进行播放
        setTimeout(
            ()=> {
                this._onPlay();
            }, 500
        )

    }


    /**
     * 播放上一首
     * 播放上一首歌前，先停止播放，再根据听歌模式选择歌曲索引
     * @private
     */
    _onPlayBack() {
        this._onStop();

        const {mode,currentIndex} =this.state;
        let _currentIndex = currentIndex;
        switch (mode) {
            case MODE.NORMAL:
                //正常模式
                _currentIndex = this._getNormalBackIndex();
                break;
            case MODE.CYCLE:
                //循环模式
                _currentIndex = this._getCycleIndex();
                break;
            case MODE.RANDOM:
                //随机模式
                _currentIndex = this._getRandomIndex();
                break;
            default :
                //正常模式
                _currentIndex = this._getNormalBackIndex();
                break;
        }

        this.setState({
            musicHash: (new Date()).getTime(),
            currentIndex: _currentIndex,
            overallLength: '60',
            currentTime: '0',
            isPlay: false,
            showMusicList: false,
        });
        //500毫秒后，进行播放
        setTimeout(
            ()=> {
                this._onPlay();
            }, 500
        )
    }

    /**
     * 停止播放
     * 停止播放的时候，先clearTimeout(this.timeout)
     * @private
     */
    _onStop() {
        clearTimeout(this.timeout);
        this.setState({
            isPlay: false
        });
    }

    /**
     * 设置音乐模式为【随机】
     * @private
     */
    _onSetRandom() {
        let {mode} = this.state;
        if (mode == MODE.RANDOM) {
            mode = MODE.NORMAL;
        } else {
            mode = MODE.RANDOM;
        }
        this.setState({
            mode: mode
        });
    }

    /**
     * 设置音乐模式为【循环】
     * @private
     */
    _onSetCycle() {
        let {mode} = this.state;
        if (mode == MODE.CYCLE) {
            mode = MODE.NORMAL
        } else {
            mode = MODE.CYCLE
        }
        this.setState({
            mode: mode
        });
    }

    /**
     * 获取正常模式下的下一个index
     * @returns {*}
     */
    _getNormalNextIndex() {
        const {currentIndex,musicList} =this.state;
        const music_list_length = musicList.length;
        let _currentIndex = currentIndex;
        if (currentIndex < music_list_length - 1) {
            _currentIndex += 1;
        } else {
            _currentIndex = 0;
        }
        return _currentIndex;
    }

    /**
     * 获取随机模式下的下一个index
     */
    _getRandomIndex() {
        const {musicList} = this.state;
        return Math.floor(Math.random() * 10 % (musicList.length - 1));
    }

    /**
     * 获取循环模式下的下一个index
     */
    _getCycleIndex() {
        return this.state.currentIndex;
    }

    /**
     * 获取正常模式下的上一个index
     * @returns {*}
     */
    _getNormalBackIndex() {
        const {currentIndex,musicList} =this.state;
        const music_list_length = musicList.length;
        let _currentIndex = currentIndex;

        if (currentIndex <= 0) {
            _currentIndex = music_list_length - 1;
        } else {
            _currentIndex -= 1;
        }
        return _currentIndex;
    }

    /**
     * 从网络上加载音乐
     * @param music
     * @private
     */
    _loadStart(music) {
        console.log('loadStart', music);
        //this.setState({
        //    currentTime: '0'
        //})
    }

    /**
     * 音乐加载完毕后的回调函数
     * @param music
     * @private
     */
    _setDuration(music) {
        console.log('setDuration', music);
        this.setState({
            overallLength: music.duration,
        });
    }

    /**
     * 音乐播放时的回调函数
     * @param music
     * @returns {boolean}
     * @private
     */
    _setTime(music) {
        const {currentTime} =this.state;
        //如果
        if (this.state.overallLength == '60' && this.state.isPlay == false) {
            return false;
        }
        let _currentTime = Math.floor(music.currentTime);
        this.setState({
            currentTime: _currentTime
        });
    }


    _videoError(music) {
        console.log('videoError', music);
    }

    _onCircleMove(second) {
        this.video.seek(second);
        this.setState({
            currentTime: second,
            isPlay: true
        })
    }

    /**
     * 控制音乐列表是否显示
     * @param isShow
     */
    _toggleMusicList(isShow) {
        this.setState({
            showMusicList: isShow
        })
    }

    render() {
        const {
            currentTime,
            overallLength,
            isPlay,
            currentIndex,
            musicHash,
            mode,
            musicList,
            showMusicList
            } = this.state;

        const music = musicList[currentIndex];//当前播放音乐
        return (
            <View style={styles.smart_home_container}>
                <StatusBar hidden={true}/>
                <Navbar toggleMusicList={this._toggleMusicList}/>
                <MusicContainer songImg={music['songImg']}
                                songName={music['songName']}
                                songAuthor={music['songAuthor']}
                    />
                <MusicControllerLine currentTime={currentTime}
                                     overallLength={overallLength}
                                     onCircleMove={this._onCircleMove}
                                     onStop={this._onStop}
                    />
                <MusicControllerBar onPlay={this._onPlay}
                                    onStop={this._onStop}
                                    isPlay={isPlay}
                                    onPlayNext={this._onPlayNext}
                                    onPlayBack={this._onPlayBack}
                                    onSetRandom={this._onSetRandom}
                                    onSetCycle={this._onSetCycle}
                                    mode={mode}
                    />
                {music['songUrl'] != '' &&
                <Video ref={(ref)=>this.video=ref}
                       source={{uri:music['songUrl']+'?t='+musicHash }} // Can be a URL or a local file.
                       rate={isPlay?1:0}                   // 0 is paused, 1 is normal.
                       paused={!isPlay}               // Pauses playback entirely.
                       repeat={mode==MODE.CYCLE}
                       playInBackground={true}
                       onLoadStart={this._loadStart}
                       onEnd={this._onPlayNext}
                       onLoad={this._setDuration}
                       onProgress={this._setTime}
                       onError={this._videoError}
                    />
                }
                {showMusicList &&
                <MusicList toggleMusicList={this._toggleMusicList}
                           onPlayNext={this._onPlayNext}/>
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