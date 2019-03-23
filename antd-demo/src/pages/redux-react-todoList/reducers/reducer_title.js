import ACTION_TYPES from '../actionCreators/actionTypes';



const handleState = new Map([
    [
        { type: ACTION_TYPES.INDEX_TITLE },
        (state, action) => {
            state.title = action.title;
            return state;
        }
    ],
]);

let defaultState = {
    title:''
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