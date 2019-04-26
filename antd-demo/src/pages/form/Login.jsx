import React from 'react';

import { Card,Form,Icon,Input,Button, Checkbox } from 'antd';



function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

  

class Login extends React.Component {
   
    state = {};

    componentDidMount() {
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
            }
        })
    }

    handleSubmit2 = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
            }
        })
    }
    

   
    render() {
        // console.log(this.props.form);
        const { isFieldTouched, getFieldError,getFieldDecorator,getFieldsError } = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');

        return (
            <div>
                <Card title="登录行内表单">
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item
                            validateStatus={userNameError ? "error" : ""}
                            help={userNameError || ""}
                        >
                            {
                                getFieldDecorator('userName', {
                                    rules: [
                                        {
                                            required:true,
                                            message:'用户名不能为空'
                                        },
                                        {
                                            min:5,max:10,
                                            message:'用户名长度在5-10位'
                                        },
                                        {
                                            pattern:new RegExp('^\\w+$','g'),
                                            message:'用户名必须为字母或者数字'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="请输入用户名"/>
                                )
                            }
                        </Form.Item>
                        <Form.Item
                            validateStatus={passwordError ? "error" : ''}
                            help={passwordError || ''}
                        >
                            {
                                getFieldDecorator('password',{
                                    rules:[
                                        {
                                            required:true,
                                            message:'密码不能为空'
                                        },
                                        // {
                                        //     min:6,max:20,
                                        //     message:'密码长度在6-20位'
                                        // },
                                        {
                                            pattern:new RegExp(/^[A-Za-z0-9~`!@#$%^&*()_+-='",;.?/|]{6,20}$/,'g'),
                                            message:'6-20位密码(包含字母、数字和下划线)'
                                        }
                                    ]
                                })(
                                    <Input prefx={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="请输入密码"/>
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>登录</Button>
                        </Form.Item>
                    </Form>
                </Card>
            
            
                <Card title="登录水平表单" style={{marginTop:20}}>
                    <Form style={{width:300}}>
                        <Form.Item>
                            {
                                getFieldDecorator('userName',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'用户名不能为空'
                                        },
                                        {
                                            min:5,max:10,
                                            message:'用户名长度在5-10位'
                                        },
                                        {
                                            pattern:new RegExp('^\\w+$','g'),
                                            message:'用户名必须为字母或者数字'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="请输入用户名"/>
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    initialValue: '',
                                    rules: []
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="请输入密码"/>
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('remember', {
                                    initialValue: true,
                                    valuePropName:'checked'
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="#" style={{float:'right'}}>忘记密码</a>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={this.handleSubmit2} type="primary" htmlType="submit" style={{width:'100%'}}>登录</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }

}

export default Form.create()(Login);


