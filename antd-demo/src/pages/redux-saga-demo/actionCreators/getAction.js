
//获取Action
import ACTION_TYPES from './actionTypes';


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
    getListData: (() => {
        return {
            type: ACTION_TYPES.GET_LIST_DATA
        }
    })

}
 

export default getAction;