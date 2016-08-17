/**
 * 路由配置类
 */
'use strict';
import {Navigator,View} from 'react-native';

import ContentDetail from '../Content/ContentDetail';
import SearchPage from '../../pages/SearchPage';
import MusicDetailPage from '../../pages/MusicDetailPage';

export default class Router {
    constructor(navigator) {
        this.navigator = navigator;
        this.pop=this.pop.bind(this);
        this.popToTop=this.popToTop.bind(this);
        this.toContentDetail=this.toContentDetail.bind(this);
        this.toSearchPage=this.toSearchPage.bind(this);
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
    toContentDetail(params) {
        this.navigator.push({
            component: ContentDetail,
            params: params,
        })
    }

    toSearchPage() {
        this.navigator.push({
            name: 'SearchPage',
            component: SearchPage,
        });
    }

}