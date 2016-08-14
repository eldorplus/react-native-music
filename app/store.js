/**
 * Store 用于存放应用中所有的state，
 * Redux应用只有一个单一的store。
 * store 是把 action 、reducers联系在一起的对象，它有以下职责：
 * 1.维持应用的状态
 * 2.提供getState()方法获取state
 * 3.提供dispatch(action)方法更新state
 * 4.通过 subscriber(listener)注册监听器
 */
'use strict';
/** createStore
 * 该方法创建一个Redux store。
 * 当Store创建后，Redux会dispatch一个action到reducer，采用初始的state填充Store
 * 我们不需要处理这个action , 只需要返回初始的state值。
 */

/**
 * applyMiddleware
 * Middleware听歌位于action调用之后，达到reducer之前的扩展点。
 * 我们可以利用Redux middleware来进行日志记录、创建崩溃报告、调用异步接口等。
 *
 * applyMiddleware 接收 createStore()
 * 并返回一个包含兼容API的函数
 * 参考：http://cn.redux.js.org/docs/advanced/Middleware.html
 */
import {
    createStore,
    applyMiddleware
} from 'redux';

/**
 *  redux-thunk 中的thunk
 *  使用thunk后，异步Action不会马上把数据传递给reducers，
 *  直到操作完成才会触发action的分发事件。
 *  这时候，action createor除了返回action对象外，还可以返回函数。
 */
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

//http://cn.redux.js.org/docs/api/applyMiddleware.html
//只有在开发环境使用
const middlewares = [thunk];
if(process.env.NODE_ENV !=='production'){
    const logger = createLogger();
    middlewares.push(logger);
}



import reducers from './reducers';

//const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const store = createStoreWithMiddleware(reducers);
export default store;