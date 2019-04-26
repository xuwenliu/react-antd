import React from 'react';
import { Card, Table, Avatar,Badge,Tooltip, Button,Radio,Modal,notification }from 'antd';
import moment from 'moment';
import axios from './../../axios/axios';
import Utils from './../../utils/utils';

export default class BasicTable extends React.Component {
    state = {
        dataSource: [],
        selectedRowKeys: [],
        loading: false,
        actionMode: 'radio',
    }

    params = {
        page: 1,
        pageSize:10
    }

    onChangeBtn = (e)=>{
        this.setState({
            actionMode: e.target.value,
            selectedRowKeys: [],//单选和多选切换时将之前选中的清空
            loading: false,
        })
    }

    //删除
    handleDelete = () => {
        Modal.confirm({
            title: '删除提示',
            content: '确定删除所选用户？',
            okText: '确认',
            cancelText: '取消',
            onOk:()=> {
                console.log(this.state.selectedRowKeys);
                console.log(this.state.dataSource);
                notification.success({
                    message: '提示',
                    description: '删除成功！',
                    duration:3,//3s自动关闭 默认4.5s，设置为null不关闭
                })
            },
        })
    }

    onRowClick = (record,index) => {
        console.log('onRowClick->record',record);
        console.log('onRowClick->index', index);
        const selectedRowKeys = [index];
        this.setState({
            selectedRowKeys,
            selectedItem:record
        });
    }

   

    onSelectChange = (selectedRowKeys,selectedRows) => {
        console.log(selectedRowKeys);
        console.log('selectedRows',selectedRows);
        this.setState({
            selectedRowKeys,
            selectedRows
        });
    }

    getList = () => {
        axios.ajax({
            url: '/user/list',
            params: this.params
        }).then((res) => {
            console.log('res',res);
            let _this = this;
            if (res.code === 0) {
                res.result.list.map((item, index) => {
                    item.key = index;
                })
                console.log(res)
                this.setState({
                    dataSource:res.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination: Utils.pagination(res, (page, pageSize) => {
                        _this.params.page = page;
                        _this.params.pageSize = pageSize;
                        this.getList();
                    })
                })
            }
        })
    }

    //组件已经挂载好了-->render函数执行完毕--->用的最多-常用来发起Ajax请求
    componentDidMount() {
        this.getList();
    }



    render() {
        const columns = [
            {
                title:'id',
                key:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                key:'userName',
                dataIndex:'userName'
            },
            {
                title:'头像',
                key:'userImg',
                dataIndex: 'userImg',
                render : (userImg) => {
                    return userImg?<Avatar src={userImg}/>:<Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                }
            },
            {
                title:'性别',
                key:'sex',
                dataIndex: 'sex',
                render: (sex) => {
                    if (sex === 1) {
                        return <Badge count='男' style={{ backgroundColor: '#1890ff' }} />;
                    }
                    return <Badge count='女' style={{ backgroundColor: '#52c41a' }} />;
                }
            },
            {
                title:'年龄',
                key:'age',
                dataIndex:'age'
            },
            {
                title:'角色',
                key:'role',
                dataIndex: 'role',
                render: (role) => {
                    const roleObj = {
                        1:'皇帝',
                        2:'大臣',
                        3:'宰相',
                        4:'将军',
                        5:'臣子',
                    }
                    return roleObj[role];
                }
            },
            {
                title:'爱好',
                key:'interest',
                dataIndex: 'interest',
                render: (interest) => {
                    const interestObj = {
                        1:'写代码',
                        2:'撩妹子',
                        3:'打篮球',
                        4:'泡网吧',
                        5:'K歌',
                    }
                    let strArr = [];
                    interest.map((item, index) => {
                        strArr.push(interestObj[item]);
                    })

                    return (<Tooltip title={strArr.length >2? strArr.join(','):''}>
                        <span>{strArr.length === 0?'无':strArr.length > 2?strArr.slice(0,2).join(',')+'...':strArr.join(',')}</span>
                    </Tooltip>
                    )
                  
                }
            },
            {
                title:'是否婚配',
                key:'isMarried',
                dataIndex: 'isMarried',
                render: (isMarried) => {
                    if (isMarried) {
                        return <Badge status="success" text="是" />;
                    }
                    return <Badge status="error" text="否" />;
                }
            },
            {
                title:'生日',
                key:'birthday',
                dataIndex: 'birthday',
                render: (birthday) => {
                    return moment(birthday * 1000).format("YYYY-MM-DD HH:mm:ss");
                }
            },
            {
                title:'联系地址',
                key:'address',
                dataIndex: 'address',
                render: (address) => {
                    return (<Tooltip title={address.length >10? address:''}>
                        <span>{address.length >10?address.slice(0,10)+'...':address}</span>
                    </Tooltip>
                    )
                }
            },
            {
                title:'早起时间',
                key:'time',
                dataIndex:'time'
            }
        ]
        //设置表格内容 居中显示
        columns.map(item => {
            item.align = "center";
        })
        const { loading, selectedRowKeys,actionMode } = this.state;
        const rowSelection = {
            type:actionMode,
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        

        return (
            <div>
                <Card title="基础表格">
                    <div>
                        <div style={{ marginBottom: 16 }}>
                            <Radio.Group defaultValue={actionMode} buttonStyle="solid" onChange={this.onChangeBtn}>
                                <Radio.Button value="radio">单选</Radio.Button>
                                <Radio.Button value="checkbox">多选</Radio.Button>
                            </Radio.Group>
                            <Button
                                style={{marginLeft:8}}
                                type="danger"
                                disabled={!hasSelected}
                                loading={loading}
                                onClick={this.handleDelete}
                            
                            >删除</Button>
                            <span style={{ marginLeft: 8 }}>
                                {hasSelected?`当前选中${selectedRowKeys.length}项`:''}
                            </span>
                        </div>

                    <Table
                        size="middle"
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        // pagination={false}
                        pagination={this.state.pagination}
                            rowSelection={rowSelection} //选择行
                            onRow={(record,index) => {
                                return {
                                    onClick: () => {
                                        //如果是单选模式可以点击行选中，多选不行
                                        if (actionMode === "radio") {
                                            this.onRowClick(record,index);
                                        }
                                    }
                                }
                            }}
                    />
                    </div>
                    

                    
                </Card>
            </div>
        )
    }

    
    


}


