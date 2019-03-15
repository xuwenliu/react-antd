import { createStore } from 'redux';
import rootReducers from '../reducers/reducer_todo_list';
 
const store = createStore(rootReducers);
export default store;