import React from 'react';
import { Card } from 'antd';
import axios from '../../axios/axios';
import './detail.less'


function* getInfo(orderId) {
    yield axios.ajax({
            url: '/order/detail',
            params: {
                orderId,
            }
        })
}

export default class OrderDetail extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            orderInfo: {}
        }
    }
    componentDidMount() {
        let orderId = this.props.match.params.orderId * 1;
        this.getOrderDetailInfo(orderId);
    }

    getOrderDetailInfo = (orderId) => {
        let order = getInfo(orderId).next().value;
        order.then((res) => {
            if (res.code === 0) {
                this.setState({
                    orderInfo: res.result
                })
                this.renderMap(res.result);
            }
        })

        // axios.ajax({
        //     url: '/order/detail',
        //     data: {
        //         orderId,
        //     }
        // }).then((res) => {
        //     if (res.code === 0) {
        //         this.setState({
        //             orderInfo: res.result
        //         })
        //         this.renderMap(res.result);
        //     }
        // })
    }

    renderMap = (result)=>{
        this.map = new window.BMap.Map('orderDetailMap');
        this.addMapControl();
        this.drawBikeRoute(result.positionList);
        this.drwaServiceArea(result.area);
    }

    //添加控件
    addMapControl = () => {
        this.map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
        this.map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    }
    //画行使路线
    drawBikeRoute = (positionList) => {
        let startPoint = '';
        let endPoint = '';
        if (positionList.length > 0) {
            let first = positionList[0];
            let last = positionList[positionList.length - 1];
            startPoint = new window.BMap.Point(first.lon, first.lat);
            endPoint = new window.BMap.Point(last.lon, last.lat);
            let startIcon = new window.BMap.Icon('/assets/img/start_point.png',
                new window.BMap.Size(36, 42),
                {
                    imageSize: new window.BMap.Size(36, 42),
                    anchor:new window.BMap.Size(18, 42)
                }
            )
            let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon });
            this.map.addOverlay(startMarker);

            //终点
            let endIcon = new window.BMap.Icon('/assets/img/end_point.png',
            new window.BMap.Size(36, 42),
                {
                    imageSize: new window.BMap.Size(36, 42),
                    anchor:new window.BMap.Size(18, 42)
                }
            )
            let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
            this.map.addOverlay(endMarker);
            
            //连接路线
            let trackPoint = [];
            positionList.map((item) => {
                trackPoint.push(new window.BMap.Point(item.lon, item.lat));
            })
            let polyline = new window.BMap.Polyline(trackPoint, {
                strokeColor:'#1869AD',
                strokeWeight:3,
                strokeOpacity:1
            });
            this.map.addOverlay(polyline);
            this.map.centerAndZoom(endPoint, 11);

        }
    }

    //画服务区
    drwaServiceArea = (areaList) => {
        let trackPoint = [];
        areaList.map((item) => {
            trackPoint.push(new window.BMap.Point(item.lon, item.lat));
        })
        let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor:'#CE0000',
            strokeWeight:4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity:0.4
        });
        this.map.addOverlay(polygon);
    }


    render() {
        const orderInfo = this.state.orderInfo;
        return (
            <div>
                <Card title="订单详情">
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{orderInfo.mode === 1?'服务区':'停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{orderInfo.orderSn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                    <div className="detail-form-content">{orderInfo.bikeSn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{orderInfo.userName}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{orderInfo.mobile}</div>
                            </li> 
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{orderInfo.startLocation}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{orderInfo.endLocation}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{orderInfo.distance/1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}