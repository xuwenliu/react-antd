import React from 'react';
import { Card } from 'antd';

import echartTheme from '../echartTheme';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/line';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/markPoint';

import ReactEcharts from 'echarts-for-react';


export default class Bar extends React.Component {

    state = {}
    componentWillMount() {
        echarts.registerTheme('heng', echartTheme);
    }
    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [1000, 2000, 1500, 3000, 2000, 1200, 800]
                }
            ]
        }
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend:{
                data:['ofo','mobile','blue gogo']
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'ofo',
                    type: 'line',
                    data: [2000, 3000, 5500, 7000, 8000, 12000, 20000]
                },
                {
                    name: 'mobile',
                    type: 'line',
                    data: [1500, 3000, 4500, 6000, 8000, 10000, 15000]
                },
                {
                    name: 'blue gogo',
                    type: 'line',
                    data: [1000, 2000, 2500, 4000, 6000, 7000, 8000]
                }
            ]
        }
        return option;
    }

    getOption3 = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type:'category',
                boundaryGap: false,
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ],
                    areaStyle: {}
                }
            ]
        }
        return option;
    }
    render() {
        return (
            <div>
                <Card title="折线图一">
                    <ReactEcharts theme="heng" style={{ height: 500 }} option={this.getOption()}  notMerge={true}
                        lazyUpdate={true}/>
                </Card>
                <Card title="折线图二" style={{marginTop:10}}>
                    <ReactEcharts theme="heng" style={{ height: 500 }} option={this.getOption2()}  notMerge={true}
                        lazyUpdate={true}/>
                </Card>
                <Card title="折线图三" style={{marginTop:10}}>
                    <ReactEcharts theme="heng" style={{ height: 500 }} option={this.getOption3()}  notMerge={true}
                        lazyUpdate={true}/>
                </Card>
            </div>
        )
    }
}


