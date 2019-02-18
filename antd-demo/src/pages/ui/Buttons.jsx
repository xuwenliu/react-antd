import React from 'react';
import { Card,Button,Icon,Radio } from 'antd';


import './ui.less';


export default class Buttons extends React.Component{
    constructor(){
        super();
        this.state={
            loading:true,
            size:'default'
        }
    }
    //不显示loading
    handleCloseLoading = ()=>{
        this.setState({
            loading:false
        })
    }
    //大小设置
    handleChangeSize = (e) => {
        this.setState({
            size:e.target.value
        })
    }
    render(){
        return (
            <div>
                <Card title="基础按钮" className="card-wrap">
                    <Button>default按钮</Button>
                    <Button type="primary">primary按钮</Button>
                    <Button type="dashed">dashed按钮</Button>
                    <Button type="danger">danger按钮</Button>
                    <Button disabled>disabled按钮</Button>
                </Card>
                <Card title="图像按钮" className="card-wrap">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button icon="search" shape="circle"></Button>
                    <Button icon="search" type="primary">搜索</Button>
                    <Button icon="download" type="primary">下载</Button>
                    <Button icon="download" type="primary" shape="round">下载</Button>
                </Card>
                <Card title="Loading按钮" className="card-wrap">
                    <Button loading={this.state.loading}>确定</Button>
                    <Button loading={this.state.loading}  type="primary" shape="circle"></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button loading={this.state.loading} shape="circle"></Button>
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                </Card>
                <Card title="按钮组" style={{marginBottom:10}}>
                    <Button.Group>
                        <Button type="primary" icon="left">返回</Button>
                        <Button type="primary">前进<Icon type="right" /></Button>
                    </Button.Group>
                </Card>

                <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group onChange={this.handleChangeSize} value={this.state.size}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button size={this.state.size}>default按钮</Button>
                    <Button size={this.state.size} type="primary">primary按钮</Button>
                    <Button size={this.state.size} type="dashed">dashed按钮</Button>
                    <Button size={this.state.size} type="danger">danger按钮</Button>
                    <Button size={this.state.size} disabled>disabled按钮</Button>
                </Card>
            </div>
            
        );
    }
}