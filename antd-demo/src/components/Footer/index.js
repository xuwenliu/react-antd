import React from 'react';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>Footer</div>
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
