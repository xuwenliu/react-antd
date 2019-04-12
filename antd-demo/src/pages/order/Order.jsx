import React from 'react';
import { Card, Form, Select, Button, Table, message, Modal, Radio, notification, DatePicker } from 'antd';
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
const orderStatusArr = [
    { id: '', name: '全部' },
    { id: 1, name: '进行中' },
    { id: 2, name: '进行中(临时锁车)' },
    { id: 3, name: '行程结束' }
]


export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],//列表数据
            pagination:()=>{},//分页
            selectedRowKeys: [],//选择列表index数组 单选就是类似：[0]
            selectedItem: {},//选中列表项
            isShowFinishOrderModal: false,//是否显示结束订单弹框
            orderInfo: {},//结束订单弹框详情
            finishOrderBtnDisabled: true,
            orderDetailBtnDisabled:true,
        }
    }

    params = {
        page: 1,
        pageSize: 10,
    }


    //搜索-用选择的数据发请求
    search = (postData) => {
        postData.startTime = moment(postData.startTime).unix();
        postData.endTime = moment(postData.endTime).unix();
        console.log('postData', postData)
        message.info(`提交的搜索条件：${JSON.stringify(postData)}`)
    }

    componentDidMount() {
        this.getList();
    }

    onRowClick = (item,index) => {
        this.setState({
            selectedRowKeys: [index],
            selectedItem: item,
            finishOrderBtnDisabled: false,
            orderDetailBtnDisabled: false,
        })
    }

    //订单详情
    orderDetail = () => {
        let orderId = this.state.selectedItem.id;
        window.open(`/#/common/order/detail/${orderId}`,'_blank')
    }

    //结束订单 弹框
    finishOrder = () => {
        let item = this.state.selectedItem;
       
        // if (Object.keys(item).length === 0) {
        //     //判断是否选择了，这里是由于在constructor里面的state初始化了selectedItem为{}
        //     Modal.info({
        //         title: '提示',
        //         content:'请选择一条订单进行结束'
        //     })
        //     return;
        // }
        this.getOrderInfo(item);
    }

    //结束订单提交
    onFinishOrderSubmit = () => {
        axios.ajax({
            url: '/order/finish',
            method: 'post',
            data: {
                orderId:this.state.selectedItem.id
            }
        }).then((res) => {
            if (res.code === 0) {
                message.success('订单结束成功');
                this.setState({
                    isShowFinishOrderModal:false
                })
                this.getList();
                this.setState({
                    selectedRowKeys: [],//结束后取消掉之前的选中
                    selectedItem: {},//结束后重置详情数据
                    finishOrderBtnDisabled: true,
                    orderDetailBtnDisabled: true,
                    
                })
            }
        })
    }

    //获取订单详情
    getOrderInfo = (item) => {
        axios.ajax({
            url: '/order/finish/info',
            data: {
                orderId:item.orderId
            }
        }).then((res) => {
            if (res.code === 0) {
                this.setState({
                    isShowFinishOrderModal:true,
                    orderInfo:res.result
                })
            }
        })
    }

    getList = () => {
        axios.ajax({
            url: '/order/list',
            data: {
                ...this.params
            }
        }).then((res) => {
            let _this = this;
            if (res.code === 0) {
                let list = res.result.list.map((item, index) => {
                    item.key = index;
                    return item;
                })
                this.setState({
                    list,
                    pagination:Utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        _this.getList();
                    })
                })
            }
        })
    }

   

    render() {
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'orderSn',
            },
            {
                title: '车辆编号',
                dataIndex: 'bikeSn',
            },
            {
                title: '用户名',
                dataIndex: 'userName',
            },
            {
                title: '手机号码',
                dataIndex: 'mobile',
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render: (distance) => {
                    return distance/1000 + 'km'
                }
            },
            {
                title: '行程时长',
                dataIndex: 'totalTime',
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: (status) => {
                    return status === 1?'进行中':'行程结束'
                }
            },
            {
                title: '开始时间',
                dataIndex:'startTime',
            },
            {
                title: '结束时间',
                dataIndex: 'endTime',
            },
            {
                title: '订单金额',
                dataIndex: 'totalFee',
            },
            {
                title: '实付金额',
                dataIndex: 'userPay',
            }
        ]
        columns.map(item => item.align = "center");
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }

        return (
            <div>
                <Card>
                    <FilterForm search={this.search} />
                </Card>
                <Card style={{marginTop:20}}>
                    <Button type="primary" disabled={this.state.orderDetailBtnDisabled} onClick={this.orderDetail}>订单详情</Button>
                    <Button type="primary" disabled={this.state.finishOrderBtnDisabled} style={{marginLeft:10}} onClick={this.finishOrder}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(item,index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(item,index);
                                }
                            }
                        }}
                    />
                </div>
                <Modal
                    title="结束订单"
                    width={600}
                    visible={this.state.isShowFinishOrderModal}
                    onCancel={() => {
                        this.setState({
                            isShowFinishOrderModal:false,
                        })
                    }}
                    onOk={this.onFinishOrderSubmit}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bikeSn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.startTime}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}



class FilterForm extends React.Component {

    constructor(props) {
        super(props);
    }

    //搜索
    search = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                this.props.search(values);
            }
        })
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city', {
                            initialValue: '',
                        })(
                            <Select style={{ width: 135 }}>
                                {
                                    cityIdArr.map((item, index) => {
                                        return <Option value={item.id} key={item.id}>{item.name}</Option>
                                    })
                                }

                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('startTime', {
                            initialValue:null
                        })(
                            <DatePicker showTime={true} style={{ width: 200 }} format="YYYY-MM-DD HH:mm:ss" placeholder="请选择开始时间" />
                        )
                    }
                </FormItem>
                <FormItem label="~" colon={false} >
                    {
                        getFieldDecorator('endTime', {
                            initialValue:null
                        })(
                            <DatePicker showTime={true} style={{ width: 200 }} format="YYYY-MM-DD HH:mm:ss" placeholder="请选择结束时间" />
                        )
                    }
                </FormItem>

                <FormItem label="订单状态">
                    {
                        getFieldDecorator('orderStatus', {
                            initialValue: '',
                        })(
                            <Select style={{ width: 135 }}>
                                {
                                    orderStatusArr.map((item, index) =>
                                        <Option value={item.id} key={item.id}>{item.name}</Option>
                                    )
                                }

                            </Select>
                        )
                    }
                </FormItem>

                <FormItem>
                    <Button onClick={this.search} type="primary" icon="search" style={{ margin: '0 10px' }}>搜索</Button>
                    <Button onClick={() => this.props.form.resetFields()}>重置</Button>
                </FormItem>

            </Form>
        )
    }
}
FilterForm = Form.create({})(FilterForm);
