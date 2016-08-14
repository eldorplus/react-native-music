'use strict';
/**
 * 存放全局的 action类型
 */
export const APP = {
    SPLASH: 'SPLASH',
    TABBARSELECT: 'TABBARSELECT',
    TABBARHEIGHT: 'TABBARHEIGHT',
}

/**
 * 内容模块
 */
export const CONTENT = {
    GET_SLIDER: 'GET_SLIDER',
    GET_EXCEL: 'GET_EXCEL',//加载精选
    BEGIN_GET_EXCEL: 'BEGIN_GET_EXCEL',//开始加载精选
    END_GET_EXCEL: 'END_GET_EXCEL',//结束加载精选
    LOADING_END_EXCEL: 'LOADING_END_EXCEL',//精选加载完毕了
}

/**
 * 搜索模块
 */
export const SEARCH = {
    'UPDATE_HISTORY_SEARCH': 'UPDATE_HISTORY_SEARCH',
    'UPDATE_SEARCH_TEXT': 'UPDATE_SEARCH_TEXT',
    'GET_SEARCH_RESULT': 'GET_SEARCH_RESULT'
}