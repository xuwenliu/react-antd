import React from 'react';
import { Card,Button,Modal } from 'antd';


import './ui.less';


export default class Modals extends React.Component{
    constructor(){
        super();
        this.state={
            visible0: false,
            visible1: false,
            visible2: false,
            visible3: false,
            visible4: false,
            ModalText:"我是5s自动关闭弹框",
            visible4confirmLoading:false,
        }
    }

    openBaseModal = (visible) => {
        this.setState({
            [visible]:true
        })        
    }

    handleConfirm = (type) => {
        Modal[type]({
            title: '确定？',
            content: '您确定进行该操作吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                console.log('ok')
            },
            onCancel() {
                console.log('cancel')
            }
        })
    }
    
    render(){
        return (
            <div>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={()=> this.openBaseModal('visible0')}>Open</Button>
                    <Button type="primary" onClick={()=> this.openBaseModal('visible1')}>自定义页脚</Button>
                    <Button type="primary" onClick={()=> this.openBaseModal('visible2')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={() => this.openBaseModal('visible3')}>水平垂直居中</Button>
                    <Button type="primary" onClick={() => this.openBaseModal('visible4')}>点击确定5s后自动关闭</Button>
                    
                    
                </Card>
                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('warning')}>Warning</Button>
                </Card>

                <Modal 
                    title="基本弹框"
                    visible={this.state.visible0}
                    onOk={() => {
                        this.setState({
                            visible0:false
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            visible0:false
                        })
                    }}>
                    <p>知人者智，自知者明。胜人者有力，自胜者强。——老子</p>
                </Modal>

                
                <Modal 
                    title="自定义页脚"
                    visible={this.state.visible1}
                    okText="确定"
                    cancelText="取消"
                    onOk={() => {
                        this.setState({
                            visible1:false
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            visible1:false
                        })
                    }}>
                    <p>设置Modal属性 okText="确定" cancelText="取消"</p>
                </Modal>

                <Modal 
                    title="顶部20px弹框"
                    visible={this.state.visible2}
                    okText="ok"
                    cancelText="cancel"
                    style={{top:20}}
                    onOk={() => {
                        this.setState({
                            visible2:false
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            visible2:false
                        })
                    }}>
                    <p>顶部20px弹框 - 给Modal 设置style top:20即可</p>
                </Modal>

                <Modal 
                    title="水平垂直居中"
                    visible={this.state.visible3}
                    okText="ok"
                    cancelText="cancel"
                    centered
                    onOk={() => {
                        this.setState({
                            visible3:false
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            visible3:false
                        })
                    }}>
                    <p>水平垂直居中 - 给Modal添加centered属性即可</p>
                </Modal>

                
                <Modal 
                    title="自动关闭"
                    visible={this.state.visible4}
                    okText="确定"
                    cancelText="取消"
                    centered
                    confirmLoading={this.state.visible4confirmLoading}
                    onOk={() => {
                        this.setState({
                            ModalText: '点击确定5s后自动关闭-在5s之内连续点击按钮是不会多次触发滴',
                            visible4confirmLoading: true,
                        });

                        setTimeout(()=>{
                            this.setState({
                                visible4:false,
                                visible4confirmLoading: false,
                            });
                        },5000)

                    }}
                    onCancel={() => {
                        this.setState({
                            visible4:false
                        })
                    }}>
                    <p>{this.state.ModalText}</p>
                </Modal>

            </div>
            
        );
    }
}