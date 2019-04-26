import React from 'react';
import { Route,Link } from 'react-router-dom';

import Components from './Topic/Components';
import PropsVState from './Topic/PropsVState';
import Rendering from './Topic/Rendering';

export default class Topics extends React.Component {
    state = {};
    
    render() {
        return (
            <div>
                Topic page
                {this.props.match.url}
                <ol>
                    <li>
                        <Link to={`${this.props.match.url}/rendering`}>rendering</Link>
                    </li>
                    <li>
                        <Link to={`${this.props.match.url}/components`}>components</Link>
                    </li>
                    <li>
                        <Link to={`${this.props.match.url}/props-v-state`}>props-v-state</Link>
                    </li>
                    <li>
                        <Link to={`${this.props.match.url}/props-v-state/999`}>props-v-state id 999</Link>
                    </li>
                </ol>
                <br />
                <Route exact={true} path={`${this.props.match.path}/rendering`} component={Rendering}></Route>
                <Route exact={true} path={`${this.props.match.path}/components`} component={Components}></Route>
                <Route  path={`${this.props.match.path}/props-v-state/:id`} component={PropsVState}></Route>
            </div>
        )
    }

   
    //组件已经挂载好了-->render函数执行完毕--->用的最多-常用来发起Ajax请求
    componentDidMount() {

    }

}


