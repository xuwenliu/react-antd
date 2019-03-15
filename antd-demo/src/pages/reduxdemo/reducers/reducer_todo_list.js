import ACTION_TYPES from '../actionCreators/actionTypes';

const defaultState = {
    inputVal: '',
    list: []
}
export default ((state = defaultState, action) => {
    switch (action.type) {
        case ACTION_TYPES.TODOLIST_VALUE_CHANGE:
            const stateInput = JSON.parse(JSON.stringify(state));
            stateInput.inputVal = action.value;
            return stateInput;

        case ACTION_TYPES.TODOLIST_TODO_ITEM_ADD:
            return {
                ...state,
                list: [...state.list,state.inputVal],
                inputVal: '',
            };
        case ACTION_TYPES.TODOLIST_TODO_ITEM_DELETE:
            const stateDelete = JSON.parse(JSON.stringify(state));
            stateDelete.list.splice(action.index, 1);
            return stateDelete;
               
        default:
            return state;
    }
})