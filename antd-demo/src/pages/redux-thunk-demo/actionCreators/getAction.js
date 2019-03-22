
//获取Action
import ACTION_TYPES from './actionTypes';
import axios from '../../../axios/axios';


const getAction = {
    getInputChangeAction:((value) => {
        return {
            type: ACTION_TYPES.TODOLIST_VALUE_CHANGE,
            value
        }
    }),
    getTodoItemAddAction: (() => {
        return {
            type: ACTION_TYPES.TODOLIST_TODO_ITEM_ADD,
        }
    }),
    getTodoItemDeleteAction: ((index) => {
        return {
            type: ACTION_TYPES.TODOLIST_TODO_ITEM_DELETE,
            index
        }
    }),
    getIndexTitleAction: ((title) => {
        return {
            type: ACTION_TYPES.INDEX_TITLE,
            title
        }
    }),
    initActionData: ((data) => {
        return {
            type: ACTION_TYPES.INIT_ACTION_DATA,
            data
        }
    }),
    getInitActionData: ((callback) => {
        return (dispatch) => {
            axios.ajax({
                url: '/user/list',
            }).then((res) => {
                if (res.code === 0) {
                    dispatch(getAction.initActionData(res.result.list));
                    callback && callback();
                }
            })
        }
    })

}
 

export default getAction;