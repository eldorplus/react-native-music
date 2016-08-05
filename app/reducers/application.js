/**
 * 应用全局的redux
 */
'use strict';

import { APP } from '../config/ActionType';
import  createReducer from '../utils/create-reducer';

//初始化状态
const initialState = {
    isShowSplash: false,//是否展示闪屏
}

const actionHandle = {
    //设置闪屏状态
    [APP.SPLASH]: (state, action)=> {
        return Object.assign({}, state, {
            isShowSplash: action.data
        })
    }
}

export default  createReducer(initialState, actionHandle);
