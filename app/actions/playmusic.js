import {PLAYMUSIC} from '../config/ActionType';

export function set_is_show_music_detail(is_show) {
    return (dispatch) => {
        return Promise.resolve(
            dispatch({
                type: PLAYMUSIC.SET_IS_SHOW_MUSIC_DETAIL,
                data: is_show
            })
        );
    }
}

export function setMusicMode(mode) {
    return (dispatch)=> {
        return Promise.resolve(
            dispatch({
                type: PLAYMUSIC.CHANGE_MUSIC_MODE,
                data: mode
            })
        );
    }
}
/**
 * 停止播放音乐
 */
export function stop_play_music() {
    return (dispatch)=> {
        return Promise.resolve(
            dispatch({
                type: PLAYMUSIC.PLAY_MUSIC,
                data: false,
            })
        );
    }
}
/**
 * 播放音乐
 * @returns {Function}
 */
export function play_music() {
    return (dispatch)=> {
        return Promise.resolve(
            dispatch({
                type: PLAYMUSIC.PLAY_MUSIC,
                data: true
            })
        );
    }
}

export function play_next_song(params) {
    return (dispatch)=> {
        return Promise.resolve(
            dispatch({
                type: PLAYMUSIC.PLAY_NEXT_SONG,
                data: {
                    musicHash: params.musicHash,
                    currentIndex: params.currentIndex,
                    overallLength: params.overallLength,
                    currentTime: params.currentTime,
                    isPlay: params.isPlay,
                    showMusicList: params.showMusicList,
                }
            })
        );
    };
}

export function setMusicOverallLength(overallLength) {
    return (dispatch)=> {
        return Promise.resolve(
            dispatch({
                type: PLAYMUSIC.SET_MUSIC_OVERALLLENGTH,
                data: overallLength,

            })
        )
    }
}

export function setMusicCurrentTime(current_time) {
    return (dispatch)=> {
        return Promise.resolve(
            dispatch({
                type: PLAYMUSIC.SET_MUSIC_CURRENTTIME,
                data: current_time
            })
        )
    }
}

export function setMusicCircleMove(params) {
    return (dispatch)=> {
        return Promise.resolve(
            dispatch({
                type: PLAYMUSIC.SET_MUSIC_CIRCLE_MOVE,
                data: {
                    currentTime: params.currentTime,
                    isPlay: params.isPlay,
                },
            })
        )
    }
}

export function toggleMusicList(isShow) {
    return (dispatch)=> {
        return Promise.resolve(
            dispatch({
                type: PLAYMUSIC.TOGGLE_MUSIC_LIST,
                data: isShow,
            })
        )
    }
}