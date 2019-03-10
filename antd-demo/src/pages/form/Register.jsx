import React from 'react';
import { Card, Form, Input, Button, Icon, message, Radio, InputNumber, Select, Switch, DatePicker, TimePicker, Cascader, Upload, Checkbox } from 'antd';
import moment from 'moment';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userImg: '',//头像
            loading:false,
        }
    }



    handleSubmit = () => {
        // let values = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(JSON.stringify(values,null,2));
                message.success(`恭喜${values.userName}注册成功，密码：${values.password}`)
            }
        })
    }

    //地址选择返回的自定义格式
    displayRender = (label) => {
        console.log(label)
        return label.join('-');
    }

    //头像上传之前 可做一些对图片的要求
    beforeUpload = (file)=>{
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('上传的图片必须是jpg格式');
        }

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('上传的图片必须小于2MB!');
        }
        return isJPG && isLt2M;
    }

    getBase64 = (img,callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                userImg:imageUrl,
                loading: false,
            }));
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 3
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        const offsetLayout = {
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 12,
                    offset: 3
                }
            }
        }
        const roleSelectList = [
            { id: 1, value: '皇帝' },
            { id: 2, value: '大臣' },
            { id: 3, value: '宰相' },
            { id: 4, value: '将军' },
            { id: 5, value: '臣子' }
        ]
        const interestSelectList = [
            { id: 1, value: '写代码' },
            { id: 2, value: '撩妹子' },
            { id: 3, value: '打篮球' },
            { id: 4, value: '泡网吧' },
            { id: 5, value: 'K歌' }
        ]
        const options = [
            {
                value: '四川省',//获取的值
                label: '四川省',//显示的值
                children: [
                    {
                        value: '成都市',
                        label: '成都市',
                        children: [
                            {
                                value: '高新区',
                                label: '高新区',
                            },
                            {
                                value: '武侯区',
                                label: '武侯区',
                            },
                            {
                                value: '青羊区',
                                label: '青羊区',
                            },
                            {
                                value: '锦江区',
                                label: '锦江区',
                            }
                        ]
                    },
                    {
                        value: '绵阳市',
                        label: '绵阳市',
                        children: [
                            {
                                value: '涪城区',
                                label: '涪城区',
                            },
                            {
                                value: '三台县',
                                label: '三台县',
                            },
                            {
                                value: '江油市',
                                label: '江油市',
                            },
                            {
                                value: '游仙区',
                                label: '游仙区',
                            }

                        ]
                    }
                ]
            },
            {
                value: '广东省',
                label: '广东省',
                children: [
                    {
                        value: '广州市',
                        label: '广州市',
                        children: [
                            {
                                vlaue:'天河区',
                                label:'天河区',
                            },
                            {
                                vlaue:'白云区',
                                label:'白云区',
                            },
                            {
                                vlaue:'海珠区',
                                label:'海珠区',
                            }
                       
                        ]
                    },
                    {
                        value: '中山市',
                        label: '中山市',
                    },
                    {
                        value: '珠海市',
                        label: '珠海市',
                    },
                    {
                        value: '江门市',
                        label: '江门市',
                    }
                ]
            }
        ]

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal">
                        <Form.Item label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        },
                                        {
                                            min: 5, max: 12,
                                            message: '用户名长度5-12'
                                        }, {
                                            pattern: new RegExp('^\\w+$', 'g'),
                                            message: '用户名必须是字母或者数字'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                                )
                            }

                        </Form.Item>

                        <Form.Item label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('password', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码不能为空'
                                        },
                                        {
                                            pattern: new RegExp(/^[A-Za-z0-9~`!@#$%^&*()_+-='",;.?/|]{6,20}$/, 'g'),
                                            message: '密码必须是6-20位(包含字母、数字和下划线、特殊字符)'
                                        }
                                    ]
                                })(
                                    <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码" />
                                )
                            }

                        </Form.Item>

                        <Form.Item label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: 1,
                                })(
                                    <Radio.Group>
                                        <Radio value={1}>男</Radio>
                                        <Radio value={2}>女</Radio>
                                    </Radio.Group>
                                )
                            }
                        </Form.Item>

                        <Form.Item label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: 23,
                                })(
                                    <InputNumber min={18} max={60} />
                                )
                            }
                        </Form.Item>

                        <Form.Item label="角色选择" {...formItemLayout}>
                            {
                                getFieldDecorator('role', {
                                    initialValue: 3,
                                })(
                                    <Select>
                                        {
                                            roleSelectList.map((item, index) => {
                                                return (
                                                    <Select.Option key={item.id} value={item.id}>{item.value}</Select.Option>
                                                )
                                            })
                                        }

                                    </Select>
                                )
                            }
                        </Form.Item>

                        <Form.Item label="爱好选择" {...formItemLayout}>
                            {
                                getFieldDecorator('interest', {
                                    initialValue: [2, 3, 4],
                                })(
                                    <Select mode="multiple" placeholder="可多选爱好">
                                        {
                                            interestSelectList.map((item, index) => {
                                                return (
                                                    <Select.Option key={item.id} value={item.id}>{item.value}</Select.Option>
                                                )
                                            })
                                        }

                                    </Select>
                                )
                            }
                        </Form.Item>

                        <Form.Item label="是否婚配" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    initialValue: false,
                                })(
                                    <Switch checkedChildren="是" unCheckedChildren="否" />
                                )
                            }
                        </Form.Item>

                        <Form.Item label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('1993-06-06'),
                                })(
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                )
                            }
                        </Form.Item>


                        <Form.Item label="填写联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: '四川省成都市高新区',
                                })(
                                    <Input.TextArea autosize={{
                                        minRows: 4, maxRows: 6
                                    }}></Input.TextArea>
                                )
                            }
                        </Form.Item>

                        <Form.Item label="选择联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('addressSelect', {
                                    initialValue: ['四川省','成都市','高新区'],
                                })(
                                    <Cascader
                                        options={options}
                                        expandTrigger="hover"
                                        displayRender={this.displayRender}
                                    />
                                )
                            }
                        </Form.Item>

                        <Form.Item label="早起时间" {...formItemLayout}>
                            {
                                getFieldDecorator('time', {
                                    initialValue: moment('08-10-00',"HH:mm:ss"),
                                })(
                                    <TimePicker />
                                )
                            }
                        </Form.Item>

                        <Form.Item label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('userImg', {
                                    rules: [
                                        {
                                            required: true,
                                            message:'请上传头像'
                                        }
                                    ]
                                })(
                                    <Upload
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        beforeUpload={this.beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                    {this.state.userImg?<img src={this.state.userImg} alt="头像"/>:uploadButton}
                                    </Upload>
                                )
                            }
                        </Form.Item>



                        <Form.Item {...offsetLayout}>
                            {
                                getFieldDecorator('isAgree', {
                                    initialValue: true,
                                    valuePropName:'checked'
                                })(
                                    <Checkbox>我已阅读过<a>注册协议</a> </Checkbox>
                                )
                            }
                        </Form.Item>



                        <Form.Item {...offsetLayout}>
                            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>注册</Button>
                        </Form.Item>

                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(Register);

