import React from 'react';
import { Card,Table } from 'antd';
import FilterForm from '../../components/filterForm/FilterForm';
import axios from '../../axios/axios';
import moment from 'moment';

export default class Salary extends React.Component{
    state = {
    };
    listArr = [];
    params = {
        date:'2017-05'
    }
    search = (postData) => {
        this.params = {
            ...postData,
        }
        let filterData = this.listArr;
        if (postData.city !== '全部') {
            filterData = filterData.filter((item) => {
                if (item.city && item.city.indexOf(postData.city) > -1) {
                    return item;
                }
            })
        } 
        if (postData.class || postData.lang) {
            filterData = filterData.filter((item) => {
                if (item.class && item.class.indexOf(postData.class) > -1) {
                    return item;
                }
                if (item.class && item.class.indexOf(postData.lang) > -1) {
                    return item;
                }
            })
        } 
        if (postData.class && postData.lang) {
            filterData = filterData.filter((item) => {
                if (item.class && item.class.indexOf(postData.class) > -1 && item.class.indexOf(postData.lang) > -1) {
                    return item;
                }
            })
        } 

        this.setState({
            list:filterData
        })
    }
    onChange = (time,tiemString) => {
        this.params.date = tiemString;
        this.getList();
    }

    getList() {
        axios.ajax({
            url: 'http://jx.1000phone.net/teacher.php/Api/studentJobData_month',
            params:this.params
        }).then(res => {
            this.listArr = res.student.map((item,index)=> {
                item.key = index
                return item;
            });
            this.setState({
                list:this.listArr
            })
        })
    }

    componentDidMount() {
        this.getList();
    }

    render() {

        const filterList = [
            {
                type: 'timeSelectSingle',
                label: '毕业时间',
                format: 'YYYY-MM',
                placeholder: '请选择毕业时间',
                startField: 'date',
                isUnTimeStamp:true,
                width: 200,
                showTime: false,
                initialValue: moment('2017-05'),
                onChange:this.onChange
            },
            {
                type: 'select',
                label: '城市',
                field: 'city',
                placeholder: '请选择城市',
                width: 135,
                initialValue: '全部',
                list: ['全部','北京','上海','广州','深圳','成都','武汉']
            },
            {
                type: 'select',
                label: '语言',
                field: 'lang',
                placeholder: '请选择语言',
                width: 135,
                initialValue: '全部',
                list: ['全部','HTML5','Android','JavaEE','IOS','UI','PHP']
            },
            {
                type: 'input',
                label: '班级',
                field: 'class',
                placeholder: '请输入1610类型班级',
                width:200
            }
        ]
        const columns = [
            {
                title: '班级',
                dataIndex:'class',
            },
            {
                title: '姓名',
                dataIndex: 'student',
                width:80,
                
            },
            {
                title: '学历',
                dataIndex: 'education',
                width:80,
                
            },
            {
                title: '状态',
                dataIndex: 'status',
                width:80,
                
            },
            {
                title: '专业',
                dataIndex:'profession',
            },
            {
                title: '薪资',
                dataIndex: 'salary',
                width:80,
                
            },
            {
                title: '城市',
                dataIndex: 'city',
                width:80,
            },
            {
                title: '入职企业',
                dataIndex: 'company',
                width:200,
            },
            {
                title: '毕业时间',
                dataIndex: 'date',
                width:200,
            }
        ]
        columns.map(item => {
            item.align = "center";
        })
        
        


        return (
            <div>
                <Card>
                <FilterForm
                    filterList={filterList}
                    search={this.search}
                />
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={false}
                    />
                </div>
            </div>
        )
    }
}