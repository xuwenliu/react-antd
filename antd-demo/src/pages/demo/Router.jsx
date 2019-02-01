import React from 'react';
import { Link,HashRouter,Switch,Route,Redirect } from 'react-router-dom';
import About from './About';
import Topics from './Topics';
import Home from './Home';
import Page404 from './Page404';


export default class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    render() {
        return (
            <div>
                <HashRouter>
                    <div>
                        <ul>
                            <li>
                                <Link to="/home" >Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/topics">Topics</Link>
                            </li>
                            <li>
                                <Link to="/404">404</Link>
                            </li>
                        </ul>
                        <br />
                        <Switch>
                            {/* 路由重定向到Home页面 */}
                            <Route path="/" exact={true} render={() =>
                                <Redirect to="/home"></Redirect>
                            }></Route>
                            
                            <Route path="/home" component={Home}></Route>
                            <Route path="/about" component={About}></Route>
                            <Route path="/topics" component={Topics}></Route>
                            <Route component={Page404}></Route>
                            
                        </Switch>
                    </div>
                </HashRouter>
            </div>
        )
    }

   
    //组件已经挂载好了-->render函数执行完毕--->用的最多-常用来发起Ajax请求
    componentDidMount() {

    }

}


