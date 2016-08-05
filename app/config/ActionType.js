'use strict';
/**
 * 存放全局的 action类型
 */
export const APP = {
    SPLASH: 'SPLASH'
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