/**
 * reducer
 * reducer是描述action如何改变状态树
 * 它是一个纯函数，接收以前的state 和 action，返回新的state。
 *
 * warning，永远【不能】在reducer中进行：
 * 1.修改传入的参数
 * 2.执行有副作用的操作，如API请求、路由转跳
 * 3.调用非纯函数：Date.now()、Math.random
 * 4.修改原来的state
 */
'use strict';

// combineReducers 可以将一个由多个reducer函数作为value对象
// 合并成一个最终的reducer函数。
import { combineReducers} from 'redux';

import application from './application';
import content from './content';
import search from './search';
import playmusic from './playmusic';

const reducers = combineReducers({
    application,
    content,
    search,
    playmusic,
});

export default reducers;