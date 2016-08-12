/**
 * 应用全局的redux
 */
'use strict';

import { APP } from '../config/ActionType';
import  createReducer from '../utils/create-reducer';

//初始化状态
const initialState = {
    isShowSplash: false,//是否展示闪屏
    selectedTab: 'equipment_ku',//tabbar选中的子项
    tabBarHeight: 49,//tabbar高度
}

const actionHandle = {
    //设置闪屏状态
    [APP.SPLASH]: (state, action)=> {
        return Object.assign({}, state, {
            isShowSplash: action.data
        })
    },
    //设置选中的tabbar子项
    [APP.TABBARSELECT]: (state, action)=> {
        return Object.assign({}, state, {
            selectedTab: action.data
        })
    },
    [APP.TABBARHEIGHT]: (state, action)=> {
        return Object.assign({}, state, {
            tabBarHeight: action.data
        });
    }
}

export default  createReducer(initialState, actionHandle);
