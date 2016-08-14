/**
 * Action
 * 是把数据从应用传到 Store的有效载荷
 * 它是Store的唯一来源，一般会通过 store.dispatch()将action传到Store。
 *
 * Action本质上是一个普通的js对象，
 * 我们约定action内必须使用 type字段来表示将要执行的动作。
 *
 * warning:
 * 1. 尽量减少在action中传递的数据
 *
 *
 * Action Creater，创建函数
 * Action创建函数就是生成action的方法。
 * 它需要简单返回一个action
 *
 */

'use strict';
import {
    closeSplashScreen,
    setTabbarItem,
    setTabbarIsShow,
} from './application';

import {
    getSliders,
    getExcel,
} from './content';

import {
    startSearch,
    getHistoryList,
    removeSomeHistoryWord,
    changeSearchText,
    getSearchResult,
} from './search';

const actions = {
    startSearch,
    getHistoryList,
    changeSearchText,
    removeSomeHistoryWord,
    getSearchResult,
    setTabbarIsShow,//设置tabbar是否展示
    setTabbarItem,//设置item
    closeSplashScreen,//关闭闪屏
    getSliders,//获取幻灯片
    getExcel,
}
export default actions;