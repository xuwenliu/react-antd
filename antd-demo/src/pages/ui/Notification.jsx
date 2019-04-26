import React from 'react';
import { Card,Button,notification,Select } from 'antd';
import './ui.less';

export default class Notification extends React.Component {
    state = {
        size: 'default',
        loading:true,
    }

    handleOpen = (type) => {
        notification[type]({
            message: '我是通知消息的title',
            description: '我是通知消息的desc',
            duration:3,//3s自动关闭 默认4.5s，设置为null不关闭
            
        })
    }

    

    render() {
        const options = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];

        return (
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleOpen('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('error')}>Error</Button>
                </Card>
                <Card title="通知提醒框-方向控制" className="card-wrap">
                    <Select
                        defaultValue="topRight"
                        style={{ width: 140, marginRight: 10 }}
                        onChange={(val) => {
                            notification.open({
                                type:'info',
                                message:`我是${val} title`,
                                description: '这里是好长好长的描述',
                                placement: val,//方向
                            });
                        }}
                    >
                        {options.map(val => 
                            <Select.Option key={val} value={val}>
                                {val}
                            </Select.Option>
                        )}
                    </Select>
                </Card>
            </div>
        )
    }

    


}


