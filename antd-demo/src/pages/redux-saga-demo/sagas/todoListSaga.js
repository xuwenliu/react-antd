import { takeEvery, put } from 'redux-saga/effects';
import getAction from '../actionCreators/getAction';
import ACTION_TYPES from '../actionCreators/actionTypes';
import axios from '../../../axios/axios';

function* getListData(action) { 
    try {
        const res = yield axios.ajax({ url: '/user/list' });
        const actionInit = getAction.initActionData(res.result.list);
        yield put(actionInit);
    } catch (e) {
        const actionInit = getAction.initActionData([]);
        yield put(actionInit);
    }
   
}

function* valueChange(action){
    console.log("action",action)
}



function* todoListSaga() {
    //这里可以 写多个action的异步处理 后面的函数可以是generator函数 或 普通函数
    yield takeEvery(ACTION_TYPES.GET_LIST_DATA, getListData);
    yield takeEvery(ACTION_TYPES.TODOLIST_VALUE_CHANGE, valueChange);
}

export default todoListSaga;