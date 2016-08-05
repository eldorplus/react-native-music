'use strict';

import {CONTENT} from '../config/ActionType';

import API from '../config/Api';
import Ajax from '../utils/Ajax';

export function getSliders() {
    return (dispatch)=> {
        Ajax.post(API.GET_SLIDER, {num: 5, from: 'app'}, (data)=> {
            if (data.status == 200) {
                dispatch({
                    type: CONTENT.GET_SLIDER,
                    data: data.data
                })
            }
        })
    }
}


export function getExcel(params) {
    return (dispatch)=> {
        //设置开始请求
        Promise.resolve(dispatch({
            type: CONTENT.BEGIN_GET_EXCEL,
        }));
        //请求参数
        var _params = {
            type: params.type || '',
            equipe_type: params.equipe_type || 'RUN_SHOES',
            sport_type: params.sport_type || 'RUN',
            page_num: params.page_num || 1,
            page_size: params.page_size || 6,
            from: params.from || 'app',
        }
        Ajax.post(API.GET_EXCEL, _params, (data)=> {
            //设置请求结束
            Promise.resolve(dispatch({
                type: CONTENT.END_GET_EXCEL,
            }));

            const status = data.status;
            if (status == -100) {
                //加载完毕了
                return Promise.resolve(dispatch({
                    type: CONTENT.LOADING_END_EXCEL,
                }));
            } else {
                return Promise.resolve(dispatch({
                    type: CONTENT.GET_EXCEL,
                    data: {
                        page_num: _params.page_num + 1,
                        list: data.data
                    }
                }));
            }
        });
    }
}