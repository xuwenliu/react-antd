import React from 'react'
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'

import App from './App';
import Admin from './Admin';
import Home from './pages/home';
import Buttons from './pages/ui/Buttons';


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