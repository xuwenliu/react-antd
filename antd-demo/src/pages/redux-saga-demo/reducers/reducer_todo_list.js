import ACTION_TYPES from '../actionCreators/actionTypes';



const handleState = new Map([
    [
        { type: ACTION_TYPES.INIT_ACTION_DATA },
        (state, action) => {
            state.list = action.data.map(({ userName }) => userName);
            return state;
        }
    ],
    [
        { type: ACTION_TYPES.TODOLIST_VALUE_CHANGE },
        (state, action) => {
            state.inputVal = action.value;
            return state;
        }
    ],
    [
        { type: ACTION_TYPES.TODOLIST_TODO_ITEM_ADD },
        (state, action) => {
            return {
                // ...state,
                list: [...state.list,state.inputVal],
                inputVal: '',
            };
        }
    ],
    [
        { type: ACTION_TYPES.TODOLIST_TODO_ITEM_DELETE },
        (state, action) => {
            state.list.splice(action.index, 1);
            return state;
        }
    ],
]);

const defaultState = {
    inputVal: '',
    list: []
}

export default ((state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state)); //深拷贝 state
    // let newState = { ...state };//深拷贝 state
    
    [...handleState].map(([key, func]) => {
        if (key.type && key.type === action.type) {
            newState = func(newState,action);
        }
    })
    return newState;
})