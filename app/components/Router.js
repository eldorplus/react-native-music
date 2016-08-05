/**
 * 路由配置类
 */
'use strict';
import {Navigator,View} from 'react-native';

import SmartHomeContainer from '../pages/SmartHomeContainer';
export default class Router {
    constructor(navigator) {
        this.navigator = navigator;
    }

    /**
     * 弹出当前
     */
    pop() {
        this.navigator.pop();
    }

    /**
     * 弹到最初
     */
    popToTop() {
        this.navigator.popToTop();
    }

    //params是个对象
    toChooseFeeling(params) {
        this.navigator.push({
            component: SmartHomeContainer,
            params: params,
        })
    }


}