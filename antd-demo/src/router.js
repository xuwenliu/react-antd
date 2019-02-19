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