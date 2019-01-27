import React from 'react';
import { Row, Col} from 'antd'
import './index.less'
import Util from '../../utils/utils'
import axios from '../../axios/'



export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            date: Util.filterDate(new Date())
        }
    }
    //组件即将挂载-->render函数还未执行
    componentWillMount() {
        this.setState({
            userName:'一定要爱你'
        })
        setInterval(() => {
            this.setState({
                date: Util.filterDate(new Date())
            })
        }, 1000)
        this.getWeatherAPIData();
    }

    getWeatherAPIData = () => {
        let city = "苍溪";
        axios.jsonp({
            url: `http://api.map.baidu.com/telematics/v3/weather?location=${encodeURIComponent(city)}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        }).then((res) => {
            let data = res.results[0].weather_data[0];
            this.setState({
                city:res.results[0].currentCity,
                ...data
            })
            console.log(res)
        })
    }

    render() {
        return (
            <div className="header ">
                <Row className="header-top">
                    <Col span={24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-title">
                        首页
                    </Col>
                    <Col span={20} className="weather">
                        <span className="date">{this.state.date}</span>
                        <span className="weather-city">
                            {this.state.city}
                        </span>
                        <span className="weather-img">
                            <img src={this.state.dayPictureUrl} alt="" />
                        </span>
                        <span className="weather-detail">
                            {this.state.weather}
                        </span>
                    </Col>
                </Row>
            </div>
        )
    }

    

    //组件已经挂载好了-->render函数执行完毕--->用的最多-常用来发起Ajax请求
    componentDidMount() {

    }

    //props变化了-->接受到了新的props
    componentWillReceiveProps(nextProps) {

    }

    //props或者state变化了-->接受到了新的props或者state
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    //即将更新-->render函数还未执行
    componentWillUpdate(nextProps, nextState) {

    }

    //更新完毕-->render函数执行完毕
    componentDidUpdate(prevProps, prevState) {

    }

    //销毁之前
    componentWillUnMount() {

    }


}
