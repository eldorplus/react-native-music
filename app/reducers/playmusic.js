'use strict';

import createReducer from '../utils/create-reducer';

import {PLAYMUSIC} from '../config/ActionType';
//模拟数据
import MUSICLIST from '../Data/MusicList';//音乐数据
import MODE from '../Data/Mode'; //播放模式，包含正常、随机、循环

/**
 * 初始化状态
 * @type {{}}
 */
const initState = {
    is_show_detail_page: false,//是否展示播放详情页
    musicList: MUSICLIST,
    currentIndex: 0,//当前音乐列表播放索引
    overallLength: '60',//总音乐时长
    currentTime: '0',//当前播放时长
    mode: MODE.NORMAL,//播放模式，默认正常
    musicHash: (new Date()).getTime(),//音乐请求hash,在播放下一首时刷新
    isPlay: false,//播放状态
    showMusicList: false,//显示音乐列表

}

const actionHandle = {
    [PLAYMUSIC.SET_IS_SHOW_MUSIC_DETAIL]: (state, action)=> {
        const newState = Object.assign({}, state, {
            is_show_detail_page: action.data
        });
        return newState;
    },
    [PLAYMUSIC.PLAY_MUSIC]: (state, action)=> {
        const newState = Object.assign({}, state, {
            isPlay: action.data
        });
        return newState;
    },
    [PLAYMUSIC.PLAY_NEXT_SONG]: (state, action)=> {
        const newState = Object.assign({}, state, {
            musicHash: action.data.musicHash,
            currentIndex: action.data.currentIndex,
            overallLength: action.data.overallLength,
            currentTime: action.data.currentTime,
            isPlay: action.data.isPlay,
            showMusicList: action.data.showMusicList,
        });
        return newState;
    },
    [PLAYMUSIC.CHANGE_MUSIC_MODE]: (state, action)=> {
        const newState = Object.assign({}, state, {
            mode: action.data
        });
        return newState;
    },
    [PLAYMUSIC.SET_MUSIC_OVERALLLENGTH]: (state, action)=> {
        const newState = Object.assign({}, state, {
            overallLength: action.data
        });
        return newState;
    },
    [PLAYMUSIC.SET_MUSIC_CURRENTTIME]: (state, action)=> {
        const newState = Object.assign({}, state, {
            currentTime: action.data,
        });
        return newState;
    },
    [PLAYMUSIC.TOGGLE_MUSIC_LIST]: (state, action)=> {
        const newState = Object.assign({}, state, {
            showMusicList: action.data
        });
        return newState;
    }
}

export default createReducer(initState, actionHandle);