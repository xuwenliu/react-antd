//reducer 合并
import { combineReducers } from 'redux';
import todoListReducers from './reducer_todo_list';
import titleReducers from './reducer_title';

let rootReducers = combineReducers({
    titleReducers,
    todoListReducers,
})


export default rootReducers;