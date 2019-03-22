import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers/reducer_common';


//使用redux-thunk中间件 目的是为了 处理异步请求
//将 异步请求 放到 anctionCreators中去处理了。

/* 原理是：以前的store.dispatch(action)中：
    action是一个对象
    而使用了redux-thunk就让这个action变成了一个函数
    相当于给dispatch方法升级了
*/
/*
    下面这里的写法 参照：https://github.com/zalmoxisus/redux-devtools-extension
    主要是为了使用 redux-devtools-extension这个浏览器调试插件
*/

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(
    rootReducers,
    enhancer
);
export default store;