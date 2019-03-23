import React from 'react';
import TodoListUI from './todoListUI';
import getAction from './actionCreators/getAction';
import { connect } from 'react-redux';



class ReduxReactTodoList extends React.Component{
   
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     const action = getAction.getListData();
    //     store.dispatch(action);
    // }
    // handleInputChange = (e) =>{
    //     store.dispatch(getAction.getInputChangeAction(e.target.value));
    // }
    addItem = () => {
        if (this.props.inputVal) {
            this.props.handleBtnAdd();
        }
    }

    // handleItemDelete = (index) =>{
    //     store.dispatch(getAction.getTodoItemDeleteAction(index));
    // }

    render() {
        const { inputVal, list, handleInputChange, handleItemDelete} = this.props;
        return (
            <TodoListUI
                inputVal = {inputVal}
                list = {list}
                handleInputChange = {handleInputChange}
                handleBtnAdd = {this.addItem}
                handleItemDelete = {handleItemDelete}
        />);
    }
}

const mapStateToProps = (state)=>{
    //这里state 里面有todoListReducers 和 titleReducers 
    //里面有todoListReducers 里面有 inputVal 和 list 直接解构赋值
    return {
        ...state.todoListReducers
        // inputVal:state.todoListReducers.inputVal,
        // list:state.todoListReducers.list,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        handleInputChange:(e) => {
            dispatch(getAction.getInputChangeAction(e.target.value));
        },
        handleBtnAdd:()=>{
            dispatch(getAction.getTodoItemAddAction());
        },
        handleItemDelete(index){
            dispatch(getAction.getTodoItemDeleteAction(index));
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ReduxReactTodoList);

