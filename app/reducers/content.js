'use strict';

import createReducer from '../utils/create-reducer';

import {CONTENT} from '../config/ActionType';

/**
 * 初始化状态
 */
const initState = {

    sliders: [],
    excelList: {
        page_num: 1,//页码
        page_size: 6,//每页加载数量
        fetching_status: false,//是否加载中
        is_load_end: false,//是否到底了
        list: [],//数据
    },
}

const actionHandler = {
    [CONTENT.GET_SLIDER]: (state, action)=> {
        const newState = Object.assign({}, state, {
            sliders: action.data
        });
        return newState;
    },
    //请求精选结果
    [CONTENT.GET_EXCEL]: (state, action)=> {
        const newList = [...state['excelList']['list'],...action['data']['list']];
        const newExcelList = Object.assign({}, state.excelList, {
            list: newList,
            page_num : action['data']['page_num']
        });

        const newState = Object.assign({}, state, {
            excelList: newExcelList
        });
        return newState;
    },
    //开始请求精选
    [CONTENT.BEGIN_GET_EXCEL]: (state, action)=> {

        const newExcelList = Object.assign({}, state.excelList, {
            fetching_status: true,
        });

        const newState = Object.assign({}, state, {
            excelList: newExcelList
        });
        return newState;
    },

    //结束请求精选
    [CONTENT.END_GET_EXCEL]: (state, action)=> {
        const newExcelList = Object.assign({}, state.excelList, {
            fetching_status: false,
        });

        const newState = Object.assign({}, state, {
            excelList: newExcelList
        });
        return newState;
    },
    //精选加载完毕
    [CONTENT.LOADING_END_EXCEL]: (state, action)=> {
        const newExcelList = Object.assign({}, state.excelList, {
            is_load_end: true,
        });

        const newState = Object.assign({}, state, {
            excelList: newExcelList
        });
        return newState;
    }
}

export default createReducer(initState, actionHandler);