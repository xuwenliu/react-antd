import React from 'react'
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'

import App from './App';
import Admin from './Admin';
import Home from './pages/home';
import Buttons from './pages/ui/Buttons';
import Modals from './pages/ui/Modals';
import Loadings from './pages/ui/Loadings';
import Notification from './pages/ui/Notification';
import Messages from './pages/ui/Messages';
import Tabpages from './pages/ui/Tabs';
import Gallery from './pages/ui/Gallery';
import Carousels from './pages/ui/Carousels';
import Login from './pages/form/Login';
import Register from './pages/form/Register';
import BasicTable from './pages/table/BasicTable';
import HightTable from './pages/table/HightTable';
import City from './pages/city/city';
import Order from './pages/order/Order';
import OrderDetail from './pages/order/OrderDetail';
import User from './pages/user/User';
import BikeMap from './pages/map/BikeMap';
import Bar from './pages/echarts/bar/Bar';
import Pie from './pages/echarts/pie/Pie';
import Line from './pages/echarts/line/Line';


import Common from './common';



import ReduxThunkDemo from './pages/redux-thunk-demo/redux-thunk-demo';
import ReduxSagaDemo from './pages/redux-saga-demo/redux-saga-demo';
import ReduxReactTodoList from './pages/redux-react-todoList/redux-react-todoList';


export default class ERouter extends React.Component{
    render(){
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/common" render={() =>
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail}></Route>
                            </Common>
                        }></Route>
                        <Route path="/" render={()=>
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home}></Route>
                                    <Route path="/ui/buttons" component={Buttons}></Route>
                                    <Route path="/ui/modals" component={Modals}></Route>
                                    <Route path="/ui/loadings" component={Loadings}></Route>
                                    <Route path="/ui/notification" component={Notification}></Route>
                                    <Route path="/ui/messages" component={Messages}></Route>
                                    <Route path="/ui/tabs" component={Tabpages}></Route>
                                    <Route path="/ui/gallery" component={Gallery}></Route>
                                    <Route path="/ui/carousel" component={Carousels}></Route>
                                    <Route path="/form/login" component={Login}></Route>
                                    <Route path="/form/register" component={Register}></Route>
                                    <Route path="/table/basic" component={BasicTable}></Route>
                                    <Route path="/table/hight" component={HightTable}></Route>
                                    <Route path="/city" component={City}></Route>
                                    <Route path="/order" component={Order}></Route>
                                    <Route path="/user" component={User}></Route>
                                    <Route path="/bikeMap" component={BikeMap}></Route>
                                    <Route path="/charts/bar" component={Bar}></Route>
                                    <Route path="/charts/pie" component={Pie}></Route>
                                    <Route path="/charts/line" component={Line}></Route>

                                    <Route path="/redux/thunk" component={ReduxThunkDemo}></Route>
                                    <Route path="/redux/saga" component={ReduxSagaDemo}></Route>
                                    <Route path="/redux/react/todolist" component={ReduxReactTodoList}></Route>

                                    
                                    <Redirect to="/home" />
                                </Switch>
                            </Admin>
                        }></Route>
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}