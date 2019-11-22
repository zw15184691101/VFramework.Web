/*应用根组件*/
import React, { Component } from 'react'
import {BrowserRouter,Switch,Route}  from 'react-router-dom'
import Admin from './views/admin/admin'
import Login from './views/login/login'

export default class App extends Component {
    
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Admin}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
