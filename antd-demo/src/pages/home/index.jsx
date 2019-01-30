import React from 'react';
import './index.less'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="home-wrap">
                高兴地学习React
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


