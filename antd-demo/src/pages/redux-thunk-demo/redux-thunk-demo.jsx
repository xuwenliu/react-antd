import React from 'react';
import store from './store/store'
import getAction from './actionCreators/getAction'
import TodoListUI from './todoListUI';
import { message } from 'antd';


//容器组件，只用于逻辑处理
export default class Name extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        store.subscribe(() => {
            this.setState(store.getState().todoListReducers)
        });
    }

    handleInputChange = (e) => {
        store.dispatch(getAction.getInputChangeAction(e.target.value));
    }
    handleBtnAdd = () => {
        if (this.state.inputVal) {
            store.dispatch(getAction.getTodoItemAddAction());
        }
    }
    handleItemDelete = (index) => {
        store.dispatch(getAction.getTodoItemDeleteAction(index));
    }
  
    componentDidMount() {
        //初始化 list 将ajax请求放到了getInitActionData中去处理了。
        store.dispatch(getAction.getInitActionData(() => {
            message.success('数据初始化成功');
        }));
    }

    render() {
        return (
            <TodoListUI
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleBtnAdd={this.handleBtnAdd}
                handleItemDelete = {this.handleItemDelete}
            />
        )
    }

   
    

    


}


