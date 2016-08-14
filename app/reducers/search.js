'use strict';

import createReducer from '../utils/create-reducer';

import {SEARCH} from '../config/ActionType';

/**
 * 初始化状态
 */
const initState = {
    search_text: '',
    history_list: [],
    search_result_list: [],
}

const actionHandler = {
    [SEARCH.UPDATE_HISTORY_SEARCH]: (state, action)=> {
        const newState = Object.assign({}, state, {
            history_list: action.data
        });
        return newState;
    },
    [SEARCH.UPDATE_SEARCH_TEXT]: (state, action)=> {
        const newState = Object.assign({}, state, {
            search_text: action.data,
        });
        return newState;
    },
    [SEARCH.GET_SEARCH_RESULT]: (state, action)=> {
        const newState = Object.assign({}, state, {
            search_result_list: action.data
        });
        return newState;
    }

}

export default createReducer(initState, actionHandler);