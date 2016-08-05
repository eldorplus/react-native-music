'use strict';
/**
 * 用于存放应用全局的action
 *
 * 异步Action Creator
 * 通过指定的middleware，action creator除了返回action对象外还可以返回函数。
 * 这时 这个action creater 就是Thunk。
 * 异步Action 不会马上把数据传递给reducer，但是一旦操作完成就会触发action的分发事件。
 */

import {APP} from '../config/ActionType';

/**
 * 关闭闪屏
 */
export function closeSplashScreen() {
    return (dispatch) => {
        return Promise.resolve(
            dispatch({
                type: APP.SPLASH,
                data: false
            })
        );
    }
}
