import React from 'react';
import { Card, Button, message } from 'antd';
import './ui.less';

export default class Messages extends React.Component {

    state = {};
    /**
     * 第一个参数，提示内容
     * 第二个参数，自动关闭的延时，单位秒。设为 0 时不自动关闭。
     * 第三个参数，关闭时触发的回调函数
     * 详情：https://ant.design/components/message-cn/#components-message-demo-duration
     */
    handleOpen = (type)=>{
        message[type]('我是全局Message提示内容',2,()=>{
            alert('2s -->close')
        })
    }

    render() {
        return (
            <div>
                <Card title="全局提示框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleOpen('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('loading')}>Loading</Button>
                </Card>
            </div>
        )
    }

    


}


