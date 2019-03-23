//定义Action 类型

const ACTION_TYPES = {
    TODOLIST_VALUE_CHANGE:'TODOLIST_VALUE_CHANGE',//input change
    TODOLIST_TODO_ITEM_ADD:'TODOLIST_TODO_ITEM_ADD', //add 
    TODOLIST_TODO_ITEM_DELETE: 'TODOLIST_TODO_ITEM_DELETE',//delete
    INIT_ACTION_DATA: 'INIT_ACTION_DATA',//初始化list
    GET_LIST_DATA:'GET_LIST_DATA',//通过redux-saga 触发的action
    
    
    INDEX_TITLE:'INDEX_TITLE',//首页标题
}

export default ACTION_TYPES;