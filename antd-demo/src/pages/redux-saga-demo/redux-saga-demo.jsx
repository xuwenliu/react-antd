import React from 'react';
import TodoListUI from './todoListUI';
import store from './store/store';
import getAction from './actionCreators/getAction';

class ReduxSagaDemo extends React.Component{
    constructor(props) {
        super(props);
        // this.state = store.getState().todoListReducers;
        store.subscribe(() => {
            console.log(store.getState().todoListReducers)
            this.setState(store.getState().todoListReducers)
        });
    }

    componentDidMount() {
        const action = getAction.getListData();
        store.dispatch(action);
    }
    handleInputChange = (e) =>{
        store.dispatch(getAction.getInputChangeAction(e.target.value));
    }
    handleBtnAdd = () =>{
        if (this.state.inputVal) {
            store.dispatch(getAction.getTodoItemAddAction());
        }
    }

    handleItemDelete = (index) =>{
        store.dispatch(getAction.getTodoItemDeleteAction(index));
    }

    render() {
        return (
            <TodoListUI
                {...this.state}
                handleInputChange = {this.handleInputChange}
                handleBtnAdd = {this.handleBtnAdd}
                handleItemDelete = {this.handleItemDelete}
        />);
    }
}

export default ReduxSagaDemo;