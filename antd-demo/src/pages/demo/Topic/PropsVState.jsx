
import React from 'react';

export default class PropsVState extends React.Component {
    state = {};
    
    render() {
        return (
            <div>
                PropsVState page width children
                {this.props.match.params.id}
            </div>
        )
    }

   
    //组件已经挂载好了-->render函数执行完毕--->用的最多-常用来发起Ajax请求
    componentDidMount() {

    }

}


