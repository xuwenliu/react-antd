import React from 'react';

import { Card } from 'antd';
import FilterForm from '../../components/filterForm/FilterForm';
import Axios from '../../axios/axios';
import Utils from '../../utils/utils';

export default class BikeMap extends React.Component{
    state = {}

    params = {};
    search = (data) => {
        this.params = data;
        this.getMapData();
    }

    getMapData = () => {
        Axios.ajax({
            url: '/map/bike',
            params:this.params
        }).then((res) => {
            if (res.code === 0) {
                this.setState({
                    totalCount:res.result.totalCount
                })
                this.renderMap(res.result);
            }
        })
    }

    renderMap = (data) => {
        let list = data.routeList;
        this.map = new window.BMap.Map('container', { enableMapClick: false });
        let first = list[0].split(',');
        let last = list[list.length-1].split(',');
        let startPoint = new window.BMap.Point(first[0], first[1]);
        let endPoint = new window.BMap.Point(last[0], last[1]);
        this.map.centerAndZoom(endPoint, 11);
        
        //添加起始图标
        let startPointIcon = new window.BMap.Icon(`${Utils.cdnUrl}/assets/img/start_point.png`, new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        var bikeMarkerStart = new window.BMap.Marker(startPoint, { icon: startPointIcon });
        this.map.addOverlay(bikeMarkerStart);

        //添加结束图标
        let endPointIcon = new window.BMap.Icon(`${Utils.cdnUrl}/assets/img/end_point.png`, new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        var bikeMarkerEnd = new window.BMap.Marker(endPoint, { icon: endPointIcon });
        this.map.addOverlay(bikeMarkerEnd);


        //链接起始结束路线
        let routeList = [];
        list.map(item => {
            let p = item.split(',');
            let point = new window.BMap.Point(p[0], p[1]);
            routeList.push(point);
        })
        let polyline = new window.BMap.Polyline(routeList,{
            strokeColor: "#ef4136",
            strokeWeight: 3,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyline);

        //添加服务区
        let serviceList = data.serviceList;
        let servicePointist = [];
        serviceList.map(item => {
            let point = new window.BMap.Point(item.lon, item.lat);
            servicePointist.push(point);
        })

        let servicesPolygon = new window.BMap.Polygon(servicePointist,{
            strokeColor: "#ef4136",
            strokeWeight: 3,
            strokeOpacity: 1
        })
        this.map.addOverlay(servicesPolygon);

        //添加地图中的自行车
        let bikeList = data.bikeList;
        let bikeIcon = new window.BMap.Icon(`${Utils.cdnUrl}/assets/img/bike.jpg`, new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });

        bikeList.map(item => {
            let p = item.split(',');
            let point = new window.BMap.Point(p[0], p[1]);
            let bikeMarker = new window.BMap.Marker(point, { icon: bikeIcon });
            this.map.addOverlay(bikeMarker);
        })

        this.addMapControl();
    }

    //添加控件
    addMapControl = () => {
        this.map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
        this.map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    }

    componentDidMount() {
        this.getMapData();
    }

    render() {
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
                type: 'timeSelect',
                label: '行使时间',
                width: 200,
            }
        ]
        return (
            <div>
                <Card>
                    <FilterForm filterList={filterList} search={this.search} />
                </Card>
                <Card style={{marginTop:10}}>
                    <div>共{this.state.totalCount}辆车</div>
                    <div id="container" style={{height:500}}></div>
                </Card>
            </div>
        )
    }
}