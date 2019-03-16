//reducer 合并
import { combineReducers } from 'redux';
import todoListReducers from '../reducers/reducer_todo_list';
import titleReducers from '../reducers/reducer_title';

let rootReducers = combineReducers({
    titleReducers,
    todoListReducers,
})


export default rootReducers;