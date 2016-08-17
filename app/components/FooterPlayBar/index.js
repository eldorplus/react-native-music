'use strict';

import React,{
    Component
} from 'react';

import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Video from 'react-native-video';
import MusicDetailPage from '../../pages/MusicDetailPage';
import MODE from '../../Data/Mode'; //播放模式，包含正常、随机、循环


export default class FooterPlayBar extends Component {
    // 构造
    constructor(props) {
        super(props);
        this._onPressShowDetailPage = this._onPressShowDetailPage.bind(this);
        //  Video
        this._loadStart = this._loadStart.bind(this);
        this._setDuration = this._setDuration.bind(this);
        this._setTime = this._setTime.bind(this);
        this._onCircleMove = this._onCircleMove.bind(this);
        this._onPlay = this._onPlay.bind(this);
        this._onStop = this._onStop.bind(this);
        this._onPlayNext = this._onPlayNext.bind(this);
        this._onPlayBack = this._onPlayBack.bind(this);
        this._onSetCycle = this._onSetCycle.bind(this);
        this._onSetRandom = this._onSetRandom.bind(this);
        this._videoError = this._videoError.bind(this);
    }

    _onPressShowDetailPage() {
        const {actions} = this.props;
        actions.set_is_show_music_detail(true);
    }

    /**
     * 显示音乐播放底部栏
     * @returns {XML}
     * @private
     */
    _renderFooterPlayBar() {
        const {actions,router,playmusic} = this.props;
        const {
            is_show_detail_page,
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
            <View style={styles.container}>
                <View style={styles.album_img}>
                </View>
                <TouchableWithoutFeedback
                    onPress={this._onPressShowDetailPage}>
                    <View style={styles.album_info}>
                        <Text style={styles.album_name}>{music.songName}</Text>
                        <Text style={styles.album_iyirc}>小纸伞 影子被拉长</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.btn_wrapper}>
                    <View style={[styles.pause_btn,styles.icon]}>
                        {isPlay == true &&
                        <Icon.Button
                            name="pause"
                            size={12}
                            color="green"
                            backgroundColor="transparent"
                            style={{justifyContent:'center'}}
                            iconStyle={{marginRight:0}}
                            onPress={this._onStop}/>
                        }
                        {isPlay == false &&
                        <Icon.Button
                            name="play"
                            size={12}
                            color="green"
                            backgroundColor="transparent"
                            style={{justifyContent:'center'}}
                            iconStyle={{marginRight:0}}
                            onPress={this._onPlay}/>
                        }
                    </View>
                    <Icon name="navicon" color="green" size={20} style={styles.icon}/>
                </View>
            </View>
        );
    }

    /**
     * 显示音乐播放详情页
     * @returns {XML}
     * @private
     */
    _renderMusicDetail() {
        const {actions,router,playmusic} = this.props;
        return (
            <MusicDetailPage actions={actions}
                             router={router}
                             playmusic={playmusic}
                             onCircleMove={this._onCircleMove}
                             onStop={this._onStop}
                             onPlay={this._onPlay}
                             onPlayNext={this._onPlayNext}
                             onPlayBack={this._onPlayBack}
                             onSetRandom={this._onSetRandom}
                             onSetCycle={this._onSetCycle}
                />
        )
    }

    /**
     * 播放音乐
     */
    _onPlay() {
        const {actions,playmusic}=this.props;
        const {currentTime,overallLength} = playmusic;
        if (currentTime < overallLength) {
            actions.play_music();
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
        const {actions,playmusic}=this.props;
        const {mode,currentIndex} =playmusic;

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

        actions.play_next_song({
            musicHash: (new Date()).getTime(),
            currentIndex: _currentIndex,
            overallLength: '60',
            currentTime: '0',
            isPlay: false,
            showMusicList: false,
        });

        this._onPlay();
    }


    /**
     * 播放上一首
     * 播放上一首歌前，先停止播放，再根据听歌模式选择歌曲索引
     * @private
     */
    _onPlayBack() {
        this._onStop();

        const {actions,playmusic}=this.props;
        const {mode,currentIndex} =playmusic;
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

        actions.play_next_song({
            musicHash: (new Date()).getTime(),
            currentIndex: _currentIndex,
            overallLength: '60',
            currentTime: '0',
            isPlay: false,
            showMusicList: false,
        });
        this._onPlay();
    }

    /**
     * 停止播放
     * 停止播放的时候，先clearTimeout(this.timeout)
     * @private
     */
    _onStop() {
        clearTimeout(this.timeout);
        const {actions}=this.props;
        actions.stop_play_music();
    }

    /**
     * 设置音乐模式为【随机】
     * @private
     */
    _onSetRandom() {
        const {actions,playmusic}=this.props;
        const {mode} = playmusic;
        let _mode;

        if (mode == MODE.RANDOM) {
            _mode = MODE.NORMAL;
        } else {
            _mode = MODE.RANDOM;
        }
        actions.setMusicMode(_mode);
    }

    /**
     * 设置音乐模式为【循环】
     * @private
     */
    _onSetCycle() {
        const {actions,playmusic}=this.props;
        const {mode} = playmusic;
        let _mode;

        if (mode == MODE.CYCLE) {
            _mode = MODE.NORMAL
        } else {
            _mode = MODE.CYCLE
        }
        actions.setMusicMode(_mode);
    }

    /**
     * 获取正常模式下的下一个index
     * @returns {*}
     */
    _getNormalNextIndex() {
        const {playmusic}=this.props;
        const {currentIndex,musicList} =playmusic;
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
        const {playmusic}=this.props;
        const {musicList} = playmusic;

        return Math.floor(Math.random() * 10 % (musicList.length - 1));
    }

    /**
     * 获取循环模式下的下一个index
     */
    _getCycleIndex() {
        const {playmusic} = this.props;
        const {currentIndex} = playmusic;
        return currentIndex;
    }

    /**
     * 获取正常模式下的上一个index
     * @returns {*}
     */
    _getNormalBackIndex() {
        const {playmusic} = this.props;
        const {currentIndex,musicList} =playmusic;
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
        const {actions} = this.props;
        actions.setMusicOverallLength(music.duration);
    }

    /**
     * 音乐播放时的回调函数
     * @param music
     * @returns {boolean}
     * @private
     */
    _setTime(music) {
        const {actions,playmusic} = this.props;
        const {currentTime,overallLength,isPlay} =playmusic;
        //如果
        if (overallLength == '60' && isPlay == false) {
            return false;
        }
        let _currentTime = Math.floor(music.currentTime);
        if (currentTime == _currentTime) {
            return false;
        }
        actions.setMusicCurrentTime(_currentTime);
    }

    _videoError(music) {
        console.log('videoError', music);
        this._onPlayNext();
        this._onStop();
    }

    _onCircleMove(second) {
        const {actions} = this.props;
        this.video.seek(second);

        actions.setMusicCircleMove({
            currentTime: second,
            isPlay: true
        })

    }

    render() {
        const {playmusic} = this.props;
        const {
            is_show_detail_page,
            currentTime,
            overallLength,
            isPlay,
            currentIndex,
            musicHash,
            mode,
            musicList,
            showMusicList
            } = playmusic;

        let view, _style;
        if (is_show_detail_page == false) {
            //显示底部栏
            view = this._renderFooterPlayBar();
            _style = styles.container;
        } else {
            //显示播放详情页
            view = this._renderMusicDetail();
            _style = styles.music_detail_container;

        }
        const music = musicList[currentIndex];//当前播放音乐

        return (
            <View style={_style}>
                {view}
                {music['songUrl'] != '' &&
                <Video ref={(ref)=>this.video=ref}
                       source={{uri:music['songUrl']+'?t='+musicHash }}
                       rate={isPlay?1:0}
                       paused={!isPlay}
                       repeat={mode==MODE.CYCLE}
                       playInBackground={true}
                       onLoadStart={this._loadStart}
                       onEnd={this._onPlayNext}
                       onLoad={this._setDuration}
                       onProgress={this._setTime}
                       onError={this._videoError}
                    />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    music_detail_container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
    },
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingLeft: 14,
        paddingRight: 14,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fefefe",
        borderTopWidth: 1,
        borderColor: '#F7F7F7',
    },
    album_img: {
        width: 45,
        height: 45,
        borderRadius: 45,
        backgroundColor: '#ccc',
    },
    album_info: {
        flex: 1,
        marginLeft: 8,
        justifyContent: 'center',
    },
    album_name: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    album_iyirc: {
        fontSize: 12,
        color: '#666',
    },
    btn_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pause_btn: {
        width: 36,
        height: 36,
        borderRadius: 36,
        borderWidth: 1,
        borderColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 10,
        marginRight: 10,
    }


});
