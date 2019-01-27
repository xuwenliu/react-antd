import React from 'react';
import { Row, Col } from 'antd'
import Header from './components/Header/index'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft/index'

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Row className="container">
                    <Col span={3} className="nav-left">
                    <NavLeft></NavLeft>
                    </Col>
                    <Col span={21} className="main">
                        
                        <Header></Header>
                        <Row className="content"></Row>
                        <Footer></Footer>

                    </Col>
                </Row>

            </div>
        )
    }

    //组件即将挂载-->render函数还未执行
    componentWillMount() {

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
