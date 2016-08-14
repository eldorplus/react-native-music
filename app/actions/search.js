'use strict';

import {SEARCH} from '../config/ActionType';
import realm from '../model/realm';
import Utils from '../utils/Utils';

import API from '../config/Api';
import Ajax from '../utils/Ajax';

let history_list_object = undefined;


function getHistoryListObject() {
    if (history_list_object == undefined) {
        Promise.resolve(
            history_list_object = realm.objects('HistorySearch')
        );
    }
    return history_list_object;
}

/**
 * 更新历史搜索记录
 * @param dispatch
 * @private
 */
function _updateHistoryList(dispatch) {
    let history_list_object = getHistoryListObject().sorted('create_time', true);

    const _hl = Object.assign([], history_list_object);
    //更新history_list
    Promise.resolve(
        dispatch({
            type: SEARCH.UPDATE_HISTORY_SEARCH,
            data: _hl
        })
    );
}

/***
 * 根据id，从数据中删除历史搜索词
 * @param id
 * @returns {Function}
 */
export function removeSomeHistoryWord(id) {
    return (dispatch, getState)=> {

        let history_list_object = getHistoryListObject();

        //先从数据库中删除
        Promise.resolve(
            realm.write(()=> {
                let historySearch = history_list_object.filtered('id="' + id + '"')
                realm.delete(historySearch)
            })
        );
        return Promise.resolve(_updateHistoryList(dispatch));
    }
}
/**
 * 获取历史查询关键词列表
 * @returns {Function}
 */
export function getHistoryList() {
    return (dispatch)=> {
        return Promise.resolve(_updateHistoryList(dispatch));
    }
}

/**
 * 根据某个关键词查询
 * @param word
 * @returns {Function}
 */
export function startSearch(search_text) {
    return (dispatch)=> {
        //先查询是否存在该文字，如果不存在，再写入
        //如果存在，则不用操作数据库
        ////把数据写入数据库，
        let history_list_object = getHistoryListObject();

        let historySearch;
        Promise.resolve(
            historySearch = history_list_object.filtered('word="' + search_text + '"')
        );

        if (historySearch.length == 0) {
            let hs = {
                id: Utils.uuid(11),
                word: search_text,
                create_time: Utils.getCurrentTimestamp(),
            };
            Promise.resolve(
                realm.write(()=> {
                    realm.create('HistorySearch', hs);
                })
            );
            //更新历史搜索记录
            _updateHistoryList(dispatch);
        }

        return Promise.resolve(
            dispatch({
                type: SEARCH.UPDATE_SEARCH_TEXT,
                data: {
                    'is_show_search_result':false,
                    'search_text':search_text,
                }
            })
        )
    }
}

/**
 * 更新搜索的文字，天然无副作用
 * @param text
 * @returns {Function}
 */
export function changeSearchText(text) {
    return (dispatch)=> {
        return Promise.resolve(
            dispatch({
                type: SEARCH.UPDATE_SEARCH_TEXT,
                data: {
                    'search_text':text,
                    'is_show_search_result':false,
                }
            })
        )
    }
}

/**
 * 获取查询结果
 * @param text
 */
export function getSearchResult(text) {
    return (dispatch)=> {
        Ajax.get(API.SEARCH_SONG,{key:text},(data)=>{
            if(data.code==0){
                const songs = data['data']['song']['itemlist'];
                return Promise.resolve(
                    dispatch({
                        type: SEARCH.GET_SEARCH_RESULT,
                        data: {
                            'is_show_search_result':true,
                            'search_result_list':songs,
                        }
                    })
                )
            }

        });

    }
}