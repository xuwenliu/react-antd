import React from 'react';
import { Input,Button,List} from 'antd';
import store from './store/store'
import getAction from './actionCreators/getAction'

export default class Name extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        store.subscribe(() => {
            this.setState(store.getState().todoListReducers)
        });
    }

    handleInputChange = (e) => {
        console.log(store.getState().todoListReducers)
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
        this.setState(store.getState().todoListReducers);
    }

    render() {
        const { list,inputVal } = this.state;
        return (
            <div>
                <div style={{width:400}}>
                    <Input value={inputVal} onChange={this.handleInputChange} style={{width: 300}} placeholder="请输入item" />
                    <Button onClick={this.handleBtnAdd} type="primary">添加</Button>
                </div>
                <List
                    style={{width:300}}
                    bordered
                    dataSource={list}
                    renderItem={(item,index) => (<List.Item onClick={()=>this.handleItemDelete(index)} key={index}>{item}</List.Item>)}
                />

               
            </div>
           
        )
    }

   
    

    


}


