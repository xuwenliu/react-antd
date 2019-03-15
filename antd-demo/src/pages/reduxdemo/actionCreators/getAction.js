
//获取Action
import ACTION_TYPES from './actionTypes'

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
    })

}
 

export default getAction;