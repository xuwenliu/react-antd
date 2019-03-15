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
import ReduxDemo from './pages/reduxdemo/reduxdemo'

export default class ERouter extends React.Component{
    render(){
        return (
            <HashRouter>
                <App>
                    <Switch>
                        {/* <Route path="/login" component={Login}></Route> */}
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
                                    <Route path="/reduxdemo" component={ReduxDemo}></Route>

                                    
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