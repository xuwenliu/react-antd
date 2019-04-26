import React from 'react';
import { Card, Avatar, Badge, Tooltip, Table, message, Button, Modal, Form, Input, Select, Radio, InputNumber, DatePicker,Switch } from 'antd';
import FilterForm from '../../components/filterForm/FilterForm';
import axios from '../../axios/axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

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

export default class User extends React.Component {
    
    state = {
        actionBtndisabled: true,//
        deleteVisible: false,//删除强提示
        title: '',
        isVisible: false,
        type: ''
    };

    params = {
        page: 1,
        pageSize: 10
    }
    search = (postData) => {
        this.params = {
            ...this.params,
            ...postData
        }
        message.info(`提交的搜索条件：${JSON.stringify(this.params)}`);
        this.getList();
    }
    getList = () => {
        axios.getList(this, '/user/list', this.params);
    }

    onRowClick = (item, index) => {
        this.setState({
            selectedRowKeys: [index],
            selectedItem: item,
            actionBtndisabled: false,
        })
    }
    componentDidMount() {
        this.getList();
    }


    // 创建 修改 详情
    handleOperator = (type) => {
        let item = this.state.selectedItem;
        if (type === 'add') {
            this.setState(() => {
                return {
                    title: '创建员工',
                    isVisible: true,
                    type,
                    userInfo: {}
                }
            })
        } else {
            this.setState({
                title: type === 'update' ? '修改员工' : '员工详情',
                isVisible: true,
                userInfo: item,
                type
            })
        }
    }

    resetSubmit = () => {
        this.setState({
            isVisible: false,
            selectedRowKeys: [],//结束后取消掉之前的选中
            actionBtndisabled: true,
        })
        this.userForm.props.form.resetFields();
    }

    // 创建 修改 详情 -确定
    handleSubmit = () => {
        let type = this.state.type;
        let _this = this;
        if (type === 'detail') {
            this.setState({
                isVisible: false,
                selectedRowKeys: [],//结束后取消掉之前的选中
                actionBtndisabled: true,
            })
            return;
        }


        this.userForm.props.form.validateFields((err, values) => {
            values.birthday = moment(values.birthday).unix();
            if (!err) {
                
                axios.ajax({
                    url:type == 'add'?'/user/add':'/user/update',
                    data:{
                        ...values
                    }
                }).then((res)=>{
                    if(res.code === 0){
                        _this.resetSubmit();
                        _this.getList();
                    }
                })
            }
        })
    }
    //删除
    delete = () => {
        let item = this.state.selectedItem;
        let _this = this;
        Modal.confirm({
            title: '确定要删除此用户吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                axios.ajax({
                    url: '/user/delete',
                    data: {
                        userId: item.id,
                    }
                }).then(res => {
                    if (res.code === 0) {
                        message.success('删除成功');
                        _this.setState({
                            selectedRowKeys: [],//结束后取消掉之前的选中
                            actionBtndisabled: true,
                        })
                        _this.getList();
                    } else {
                        message.success(res.msg);

                    }
                })
            }

        })


    }

    render() {
        const filterList = [
            {
                type: 'input',
                label: '用户名',
                field: 'userName',
                placeholder: '请输入用户名'
            },
            {
                type: 'input',
                label: '联系地址',
                field: 'address',
                placeholder: '请输入联系地址'
            }
        ]
        const columns = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName'
            },
            {
                title: '头像',
                key: 'userImg',
                dataIndex: 'userImg',
                render: (userImg) => {
                    return userImg ? <Avatar src={userImg} /> : <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                }
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render: (sex) => {
                    if (sex === 1) {
                        return <Badge count='男' style={{ backgroundColor: '#1890ff' }} />;
                    }
                    return <Badge count='女' style={{ backgroundColor: '#52c41a' }} />;
                }
            },
            {
                title: '年龄',
                key: 'age',
                dataIndex: 'age'
            },
            {
                title: '角色',
                key: 'role',
                dataIndex: 'role',
                render: (role) => {
                    const roleObj = {
                        1: '皇帝',
                        2: '大臣',
                        3: '宰相',
                        4: '将军',
                        5: '臣子',
                    }
                    return roleObj[role];
                }
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render: (interest) => {
                    const interestObj = {
                        1: '写代码',
                        2: '撩妹子',
                        3: '打篮球',
                        4: '泡网吧',
                        5: 'K歌',
                    }
                    let strArr = [];
                    interest.map((item, index) => {
                        strArr.push(interestObj[item]);
                    })

                    return (<Tooltip title={strArr.length > 2 ? strArr.join(',') : ''}>
                        <span>{strArr.length === 0 ? '无' : strArr.length > 2 ? strArr.slice(0, 2).join(',') + '...' : strArr.join(',')}</span>
                    </Tooltip>
                    )

                }
            },
            {
                title: '是否婚配',
                key: 'isMarried',
                dataIndex: 'isMarried',
                render: (isMarried) => {
                    if (isMarried) {
                        return <Badge status="success" text="是" />;
                    }
                    return <Badge status="error" text="否" />;
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday',
                render: (birthday) => {
                    return moment(birthday * 1000).format("YYYY-MM-DD HH:mm:ss");
                }
            },
            {
                title: '联系地址',
                key: 'address',
                dataIndex: 'address',
                render: (address) => {
                    return (<Tooltip title={address.length > 10 ? address : ''}>
                        <span>{address.length > 10 ? address.slice(0, 10) + '...' : address}</span>
                    </Tooltip>
                    )
                }
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time'
            }
        ]
        //设置表格内容 居中显示
        columns.map(item => item.align = "center");
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
        }
        let footer = {};
        if (this.state.type === 'detail') {
            footer = { footer: null }
        }
        return (
            <div>
                <Card>
                    <FilterForm
                        filterList={filterList}
                        search={this.search}
                    />
                </Card>
                <Card style={{ marginTop: 20 }}>
                    <Button icon="plus" onClick={() => this.handleOperator('add')}>创建</Button>
                    <Button icon="edit" disabled={this.state.actionBtndisabled} style={{ marginLeft: 10 }} onClick={() => this.handleOperator('update')}>修改</Button>
                    <Button icon="info-circle" disabled={this.state.actionBtndisabled} style={{ marginLeft: 10 }} onClick={() => this.handleOperator('detail')}>详情</Button>
                    <Button icon="delete" type="danger" disabled={this.state.actionBtndisabled} style={{ marginLeft: 10 }} onClick={this.delete}>删除</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(item, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(item, index);
                                }
                            }
                        }}
                    />
                </div>
                <Modal
                    width={800}
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={() => {
                        this.resetSubmit();
                    }}
                    {...footer}

                >
                    <UserForm
                        userInfo={this.state.userInfo}
                        type={this.state.type}
                        wrappedComponentRef={(inset) => this.userForm = inset}
                    />
                </Modal>
            </div>
        )
    }
}


class UserForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
        }
        const userInfo = this.props.userInfo || {};
        const type = this.props.type;

        let getRole = (role) => {
            let name = '';
            roleSelectList.map(item => {
                if (item.id === role) {
                    name = item.value;
                }
            })
            return name;
        }

        let getInterest = (interest) => {
            interest = interest || [];
            let names = [];
            interestSelectList.map((item1) => {
                interest.map((item2) => {
                    if (item1.id === item2) {
                        names.push(item1.value)
                    }
                })
            })
            return names.join(',');
        }

        return (
            <Form layout="horizontal">
                <FormItem label="姓名" {...formItemLayout}>
                    {
                        userInfo && type === "detail" ? userInfo.userName :
                            getFieldDecorator('userName', {
                                initialValue: userInfo.userName,
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
                                <Input placeholder="请输入用户名" />
                            )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        userInfo && type === "detail" ? userInfo.sex === 1 ? '男' : '女' :
                            getFieldDecorator('sex', {
                                initialValue: userInfo.sex || 1
                            })(
                                <RadioGroup>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </RadioGroup>
                            )
                    }
                </FormItem>
                <FormItem label="角色" {...formItemLayout}>
                    {
                        userInfo && type === "detail" ? getRole(userInfo.role) :
                            getFieldDecorator('role', {
                                initialValue: userInfo.role
                            })(
                                <Select>
                                    {
                                        roleSelectList.map((item, index) => {
                                            return <Option key={index} value={item.id}>{item.value}</Option>
                                        })
                                    }
                                </Select>
                            )
                    }
                </FormItem>
                <Form.Item label="爱好" {...formItemLayout}>
                    {
                        userInfo && type === "detail" ? getInterest(userInfo.interest) :
                            getFieldDecorator('interest', {
                                initialValue: userInfo.interest,
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
                        userInfo && type === "detail" ? userInfo.isMarried ? '是':'否' :
                        getFieldDecorator('isMarried', {
                            initialValue: userInfo.isMarried || false,
                        })(
                            <Switch checkedChildren="是" unCheckedChildren="否" />
                        )
                    }
                </Form.Item>

                <FormItem label="生日" {...formItemLayout}>
                    {
                        userInfo && type === "detail" ? moment(userInfo.birthday * 1000).format('YYYY-MM-DD') :
                            getFieldDecorator('birthday', {
                                initialValue: userInfo.birthday ? moment(userInfo.birthday * 1000) : null
                            })(
                                <DatePicker placeholder="请选择出生日期" format="YYYY-MM-DD" />
                            )
                    }
                </FormItem>
            </Form>
        )
    }
}
UserForm = Form.create({})(UserForm);
