import React from 'react';
import { Input,Button,List} from 'antd';


//UI组件-只用于页面显示，不用于逻辑处理。
const TodoListUI = (props =>
    <div>
        <div style={{ width: 400 }}>
            <Input value={props.inputVal} onChange={props.handleInputChange} style={{ width: 300 }} placeholder="请输入item" />
            <Button onClick={props.handleBtnAdd} type="primary">添加</Button>
        </div>
        <List
            style={{ width: 300 }}
            bordered
            dataSource={props.list}
            renderItem={(item, index) => (<List.Item onClick={() => props.handleItemDelete(index)} key={index}>{item}</List.Item>)}
        />
    </div>);


export default TodoListUI;