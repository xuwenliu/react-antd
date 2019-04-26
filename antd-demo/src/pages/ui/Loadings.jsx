import React from 'react';
import { Card,Spin,Radio, Icon,Alert,Switch } from 'antd';
import './ui.less';

export default class Loadings extends React.Component {
    state = {
        size: 'default',
        loading:true,
    }

    handleChangeSize = (e)=>{
        this.setState({
            size:e.target.value
        })
    }

    handleChangeLoading = (bool) => {
        this.setState({
            loading:bool
        })
    }

    render() {
        const icon = <Icon type="loading"></Icon>
        return (
            <div>
               
                <Card title="spin用法" className="card-wrap">
                    <Radio.Group value={this.state.size} onChange={this.handleChangeSize}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Spin size={this.state.size}></Spin>
                    <Spin size={this.state.size} indicator={icon} style={{ marginLeft: 20 }}></Spin>
                </Card>

                <Card title="内容遮罩Spin + Alert" className="card-wrap">
                   
                    <div style={{marginBottom:20}}>
                        Loading state: <Switch checked={this.state.loading} onChange={this.handleChangeLoading}/>
                    </div>
                    <Alert
                        showIcon
                        closable
                        onClose={() => {
                            alert('点击了关闭');
                        }}
                        message="Alert type='success'"
                        description="命名使用英文语义化，禁止使用特殊字符，禁止使用拼音，禁止使用中英文混合！"
                        type="success"
                        style={{marginBottom:20}}
                    />
                    
                    <Spin size={this.state.size} spinning={this.state.loading}>
                        <Alert
                            message="Alert type='info'"
                            description="项目、目录、html/css/js等文件命名全部采用小写方式， 以下划线分隔。eg：my_project_name"
                            type="info"
                            style={{marginBottom:20}}
                        />
                    </Spin>

                    <Spin size={this.state.size} tip="加载中..." spinning={this.state.loading}>
                        <Alert
                            message="Alert type='warning' Spin tip='加载中...' "
                            description="html/css/js文件名一一对应参考微信小程序.eg: login.html、login.css、login.js"
                            type="warning"
                            style={{marginBottom:20}}
                        />
                    </Spin>

                    <Spin size={this.state.size} indicator={icon} spinning={this.state.loading}>
                        <Alert
                            message="Alert type='error' indicator='<Icon type='loading'></Icon>' "
                            description="class、图片、视频、音频采用小写方式，以下划线或中划线分隔；eg：btn-play或btn_play"
                            type="error"
                        />
                    </Spin>

                </Card>

            </div>
        )
    }

    


}


