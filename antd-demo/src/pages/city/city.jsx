import React from 'react';
import { Card, Form, Select, Button, Table, message, Modal, Radio, notification } from 'antd';
import FilterForm from '../../components/filterForm/FilterForm';

import axios from '../../axios/axios';
import Utils from './../../utils/utils';
import moment from 'moment';


const FormItem = Form.Item;
const Option = Select.Option;

const cityIdArr = [
    { id: '', name: '全部' },
    { id: 1, name: '北京' },
    { id: 2, name: '上海' },
    { id: 3, name: '广州' },
    { id: 4, name: '深圳' },
    { id: 5, name: '成都' }
]

const modeArr = [
    { id: '', name: '全部' },
    { id: 1, name: '指定停车点模式' },
    { id: 2, name: '禁停区模式' },
]
const opModeArr = [
    { id: '', name: '全部' },
    { id: 1, name: '自营' },
    { id: 2, name: '加盟' },
]

export default class City extends React.Component {
   
    state = {
        isShowOpenCityModal: false,
    };
    params = {
        page: 1,
        pageSize: 10,
    }

    

    getList() {
        axios.getList(this,'/open/city',this.params);
    }

    componentDidMount() {
        this.getList();
    }

    //搜索-用选择的数据发请求
    search = (postData) => {
        this.params = {
            ...this.params,
            ...postData
        }
        message.info(`提交的搜索条件：${JSON.stringify(this.params)}`);
        this.getList();
    }

    //开通城市按钮-显示Modal
    handleOpenCity = () => {
        this.setState(() => {
            return {
                isShowOpenCityModal: true
            }
        })
    }

    //弹框-开通城市-确定提交
    openCitySubmit = () => {
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        message.info(`开通城市所选数据：${JSON.stringify(cityInfo)}`);
        setTimeout(() => {
            this.setState(() => {
                return {
                    isShowOpenCityModal: false
                }
            })
            notification.success({
                message: '提示',
                description: '开通成功',
            })
        }, 3000)
    }

    render() {
        const columns = [
            {
                title: '城市ID',
                dataIndex: 'id',
                width: 80,
            },
            {
                title: '城市名称',
                dataIndex: 'name',
                width: 135,
            },
            {
                title: '用车模式',
                dataIndex: 'mode',
                render: (mode) => {
                    return mode == 1 ? '停车点' : '禁停区';
                },
                width: 135,
            },
            {
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode == 1 ? '自营' : '加盟';
                },
                width: 100,
            },
            {
                title: '授权加盟商',
                dataIndex: 'franchisee_name',
                width: 135,
            },
            {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr) {
                    return arr.map((item) => {
                        return item.user_name;
                    }).join(',');
                },
                width: 150,
            },
            {
                title: '城市开通时间',
                dataIndex: 'open_time',
                render: (open_time) => {
                    return moment(open_time * 1000).format("YYYY-MM-DD HH:mm:ss");
                },
                width: 200,
            },
            {
                title: '操作时间',
                dataIndex: 'update_time',
                render: (update_time) => {
                    return moment(update_time * 1000).format("YYYY-MM-DD HH:mm:ss");
                },
                width: 200,
            },
            {
                title: '操作人',
                dataIndex: 'sys_user_name',
            }
        ]

        columns.map((item, index) => {
            item.align = "center";
        })

        const filterList = [
            {
                type: 'select',
                label: '城市',
                field: 'city',
                placeholder: '请选择城市',
                width: 135,
                initialValue: '',
                showSearch: true,
                key: 'name',
                value:'id',
                list: [
                    { id: '', name: '全部' },
                    { id: 1, name: '北京' },
                    { id: 2, name: '上海' },
                    { id: 3, name: '广州' },
                    { id: 4, name: '深圳' },
                    { id: 5, name: '成都' }
                ]
            },
            {
                type: 'select',
                label: '用车模式',
                field: 'mode',
                placeholder: '请选择用车模式',
                width: 140,
                initialValue: '',
                showSearch: true,
                key: 'name',
                value:'id',
                list: [
                    { id: '', name: '全部' },
                    { id: 1, name: '指定停车点模式' },
                    { id: 2, name: '禁停区模式' },
                ]
            },
            {
                type: 'select',
                label: '营运模式',
                field: 'op_mode',
                placeholder: '请选择营运模式',
                initialValue: '',
                showSearch: true,
                key: 'name',
                value:'id',
                list: [
                    { id: '', name: '全部' },
                    { id: 1, name: '自营' },
                    { id: 2, name: '加盟' },
                ]
            },
            {
                type: 'select',
                label: '加盟商授权状态',
                field: 'auth_status',
                placeholder: '请选择加盟商授权状态',
                initialValue: '',
                showSearch: true,
                key: 'name',
                value:'id',
                list: [
                    { id: '', name: '全部' },
                    { id: 1, name: '已授权' },
                    { id: 2, name: '未授权' },
                ]
            },
            // {
            //     type: 'input',
            //     inputType:'number',
            //     label: '账号',
            //     field: 'account',
            //     placeholder: '请输入账号',
            //     width:150,
            //     initialValue: '',
            //     allowClear:true,
            // },
            // {
            //     type: 'checkbox',
            //     label: '精确',
            //     field: 'isMatch',
            // },
            // {
            //     type: 'timeSelect',
            //     label: '注册时间',
            //     format:'YYYY-MM-DD',
            //     width:200,
            // },

        ]




        return (
            <div>
                <Card>
                    <FilterForm
                        filterList={filterList}
                        search={this.search}
                    />
                </Card>
                <Card style={{ marginTop: 20 }}>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        scroll={{ y: 350 }}
                    />
                </div>
                <Modal
                    title="开通城市"
                    visible={this.state.isShowOpenCityModal}
                    onCancel={() => {
                        this.setState(() => {
                            return {
                                isShowOpenCityModal: false
                            }
                        })
                        this.cityForm.props.form.resetFields();
                    }}
                    onOk={this.openCitySubmit}
                >
                    <OpenCityFormModal wrappedComponentRef={(open) => { this.cityForm = open; }} />
                </Modal>
            </div>
        )
    }
}


class OpenCityFormModal extends React.Component {

    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="horizontal">
                <FormItem label="选择城市" {...formItemLayout}>
                    {
                        getFieldDecorator('city_id', {
                            initialValue: 1,
                        })(
                            <Select style={{ width: 100 }}>
                                {
                                    cityIdArr.filter((item, index) => index > 0).map((item) => {
                                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem label="运营模式" {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode', {
                            initialValue: 1,
                        })(
                            <Radio.Group>
                                {
                                    opModeArr.filter((item, index) => index > 0).map((item) => {
                                        return <Radio key={item.id} value={item.id}>{item.name}</Radio>
                                    })
                                }

                            </Radio.Group>
                        )
                    }
                </FormItem>

                <FormItem label="用车模式" {...formItemLayout}>
                    {
                        getFieldDecorator('use_mode', {
                            initialValue: 1,
                        })(
                            <Radio.Group>
                                {
                                    modeArr.filter((item, index) => index > 0).map((item) => {
                                        return <Radio key={item.id} value={item.id}>{item.name}</Radio>
                                    })
                                }

                            </Radio.Group>
                        )
                    }
                </FormItem>

            </Form>
        );
    }
}

OpenCityFormModal = Form.create({})(OpenCityFormModal);