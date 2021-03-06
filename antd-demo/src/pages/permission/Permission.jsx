import React from "react";
import {
    Card,
    Button,
    Table,
    Modal,
    Form,
    Input,
    Switch,
    message,
    Tree,
    Transfer
} from "antd";
import axios from "../../axios/axios";
import moment from "moment";
import menuConfig from "../../config/menuConfig";

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

export default class Permission extends React.Component {
    state = {
        btnDisabled: true,
        isShowCreateModal: false,//显示创建角色弹框
        isShowAuthModal: false, //显示设置权限弹框
        isShowUserAuthModal:false,//显示用户授权弹框
    };
    params = {
        page: 1,
        pageSize: 10
    };

    componentDidMount() {
        this.getList();
    }

    getList = () => {
        axios.getList(this, "/role/list", this.params);
    };

    //点击表格每一行
    onRowClick = (item, index) => {
        this.setState({
            selectedRowKeys: [index],
            selectedItem: item,
            btnDisabled: false
        });
    };


    /*创建角色*********************************************************************************************** */
    //点击创建角色按钮
    handleCreate = () => {
        this.setState({
            isShowCreateModal: true
        });
    };

    //创建角色-提交
    onCreateSubmit = () => {
        this.roleForm.props.form.validateFields((err, values) => {
            if (!err) {
                axios
                    .ajax({
                        url: "/role/add",
                        data: values
                    })
                    .then(res => {
                        if (res.code === 0) {
                            message.success("创建成功!");
                            this.getList();
                            this.roleForm.props.form.resetFields();
                            this.setState({
                                isShowCreateModal: false
                            });
                        }
                    });
            }
        });
    };

    /*置权限*********************************************************************************************** */
    //点击设置权限按钮
    handleAuth = () => {
        let item = this.state.selectedItem;
        this.setState({
            isShowAuthModal: true,
            menus: item.menus
        });
    };

    //设置树形选择的菜单key
    setMenus = menus => {
        this.setState({
            menus
        });
    };

    //设置权限-提交
    onAuthSubmit = () => {
        this.authForm.props.form.validateFields((err, values) => {
            if (!err) {
                axios
                    .ajax({
                        url: "/role/auth",
                        data: {
                            ...values,
                            menus: this.state.menus
                        }
                    })
                    .then(res => {
                        if (res.code === 0) {
                            message.success("设置成功!");
                            this.getList();
                            this.setState({
                                isShowAuthModal: false
                            });
                        }
                    });
            }
        });
    };

    /*用户授权*********************************************************************************************** */
    //点击用户授权按钮
    handleUserAuth = () => {
        let item = this.state.selectedItem;
        this.setState({
            isShowUserAuthModal: true,
        });
        this.getUserAuthList(item);
    }

    //获取用户权限列表
    getUserAuthList = (item) => {
        axios.ajax({
            url: '/role/user/auth',
            params: {
                userId:item.id
            }
        }).then(res => {
            if (res.code === 0) {
                let data = res.result;
                let mockData = [];
                let targetKeys = [];
                if (data && data.length > 0) {
                    data.map(item => {
                        let dataObj = {
                            key: item.userId,
                            title: item.userName,
                            status:item.status,
                        }
                        if (item.status === 1) {
                            targetKeys.push(dataObj.key)
                        }
                        mockData.push(dataObj);
                    })
                    console.log('mockData',mockData)
                    this.setState({
                        mockData,
                        targetKeys
                    })
                }
                
            }
        })
    }

    //用户授权-提交
    onUserAuthSubmit = () => {
        let data = {
            roleId: this.state.selectedItem.id,
            roleName:this.state.selectedItem.roleName,
            userIds:this.state.targetKeys,
        }
        axios.ajax({
            url:'/role/user/auth/edit',
            data
        }).then(res => {
            if (res.code === 0){
                message.success("设置成功!");
                this.getList();
                this.setState({
                    isShowUserAuthModal: false,
                    selectedItem: {}
                });
            }
        })
    }


    render() {
        const columns = [
            {
                title: "角色ID",
                dataIndex: "id"
            },
            {
                title: "角色名称",
                dataIndex: "roleName"
            },
            {
                title: "创建时间",
                dataIndex: "createTime"
            },
            {
                title: "使用状态",
                dataIndex: "status",
                render: status => {
                    return status === 1 ? "启用" : "停用";
                }
            },
            {
                title: "授权时间",
                dataIndex: "authorizeTime",
                render: authorizeTime => {
                    return moment(authorizeTime * 1000).format(
                        "YYYY-MM-DD HH:mm:ss"
                    );
                }
            },
            {
                title: "授权人",
                dataIndex: "authorizeUserName"
            }
        ];
        columns.map(item => {
            item.align = "center";
        });

        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: "radio",
            selectedRowKeys
        };

        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleCreate}>
                        创建角色
                    </Button>
                    <Button
                        type="primary"
                        disabled={this.state.btnDisabled}
                        style={{ margin: "0 10" }}
                        onClick={this.handleAuth}
                    >
                        设置权限
                    </Button>
                    <Button
                        type="primary"
                        disabled={this.state.btnDisabled}
                        onClick={this.handleUserAuth}>
                        用户授权
                    </Button>
                </Card>
                <div style={{ marginTop: 20 }} className="content-wrap">
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
                            };
                        }}
                    />
                </div>


                <Modal
                    title="创建角色"
                    width={600}
                    visible={this.state.isShowCreateModal}
                    onCancel={() => {
                        this.roleForm.props.form.resetFields();
                        this.setState({
                            isShowCreateModal: false
                        });
                    }}
                    onOk={this.onCreateSubmit}
                >
                    <RoleForm
                        wrappedComponentRef={sss => (this.roleForm = sss)}
                    />
                </Modal>

                
                <Modal
                    title="权限设置"
                    width={600}
                    bodyStyle={{
                        height: 400,
                        overflow:'auto'
                    }}
                    visible={this.state.isShowAuthModal}
                    onCancel={() => {
                        this.authForm.props.form.resetFields();
                        this.setState({
                            isShowAuthModal: false
                        });
                    }}
                    onOk={this.onAuthSubmit}
                >
                    <AuthForm
                        info={this.state.selectedItem}
                        menus={this.state.menus}
                        setMenus={this.setMenus}
                        wrappedComponentRef={sss => (this.authForm = sss)}
                    />
                </Modal>



                <Modal
                    title="用户授权"
                    width={800}
                    visible={this.state.isShowUserAuthModal}
                    onCancel={() => {
                        this.userAuthForm.props.form.resetFields();
                        this.setState({
                            isShowUserAuthModal: false
                        });
                    }}
                    onOk={this.onUserAuthSubmit}
                >
                    <UserAuthForm
                        info={this.state.selectedItem}
                        mockData={this.state.mockData}
                        targetKeys={this.state.targetKeys}
                        setTargetKeys={(targetKeys) => {
                            this.setState({targetKeys})
                        }}
                        wrappedComponentRef={sss => (this.userAuthForm = sss)}
                    />
                </Modal>


            </div>
        );
    }
}

class RoleForm extends React.Component {
    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        };
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {getFieldDecorator("roleName", {
                        rules: [
                            {
                                required: true,
                                message: "角色名称不能为空"
                            },
                            {
                                min: 5,
                                max: 12,
                                message: "角色名称长度5-12"
                            },
                            {
                                pattern: new RegExp("[\u4e00-\u9fa5]", "g"),
                                message: "角色名称必须是中文"
                            }
                        ]
                    })(<Input placeholder="请输入角色名称" />)}
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {getFieldDecorator("status", {
                        initialValue: true,
                        valuePropName: "checked"
                    })(
                        <Switch
                            checkedChildren="启用"
                            unCheckedChildren="停用"
                        />
                    )}
                </FormItem>
            </Form>
        );
    }
}

RoleForm = Form.create({})(RoleForm);

class AuthForm extends React.Component {
    getTreeNode = data => {
        return data.map(item => {
            if (item.children && item.children.length > 0) {
                return (
                    <TreeNode title={item.title} key={item.key}>
                        {this.getTreeNode(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    };
    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        };
        const { getFieldDecorator } = this.props.form;
        const info = this.props.info;
        const menus = this.props.menus;

        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {getFieldDecorator("roleName", {
                        initialValue: info.roleName
                    })(<Input placeholder="请输入角色名称" disabled />)}
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {getFieldDecorator("status", {
                        initialValue: info.status === 1,
                        valuePropName: "checked"
                    })(
                        <Switch
                            checkedChildren="启用"
                            unCheckedChildren="停用"
                        />
                    )}
                </FormItem>
                <Tree
                    defaultExpandAll
                    checkable
                    checkedKeys={menus}
                    onCheck={checkedKeys => {
                        this.props.setMenus(checkedKeys);
                    }}
                >
                    <TreeNode title="平台权限">
                        {this.getTreeNode(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        );
    }
}
AuthForm = Form.create({})(AuthForm);



class UserAuthForm extends React.Component {

    handleChange = (targetKeys) => {
        this.props.setTargetKeys(targetKeys);
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        };
        const { getFieldDecorator } = this.props.form;
        const { info, mockData, targetKeys } = this.props;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {getFieldDecorator("roleName", {
                        initialValue: info.roleName
                    })(<Input placeholder="请输入角色名称" disabled />)}
                </FormItem>
                <FormItem label="选择用户" {...formItemLayout}>
                    <Transfer
                        dataSource={mockData}
                        targetKeys={targetKeys}
                        showSearch
                        locale={{
                            itemUnit: '名',
                            itemsUnit: '名',
                            searchPlaceholder: "请输入用户名",
                            notFoundContent:'暂无用户'
                        }}
                        listStyle={{width: 200,height: 400}}
                        titles={['待选用户', '已选用户']}
                        render={item => item.title}
                        onChange={this.handleChange}
                    />
                </FormItem>
                
            </Form>
        );
    }
}
UserAuthForm = Form.create({})(UserAuthForm);
