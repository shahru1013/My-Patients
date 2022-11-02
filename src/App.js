import React, { Component } from 'react'
import {BrowserRouter,Route,Router,Switch} from 'react-router-dom';
import './App.css'
import Mainbody from './Jsx/MainBody/Mainbody'
import PatientDashboard from './Jsx/PatientDashboard/PatientDashboard';
export default class App extends Component {
  render() {
    return (
      <div className="App">
       
        <BrowserRouter>
           <Switch>
             <Route path="/">
                <Mainbody/>
             </Route>
             <Route path="/patient">
                <PatientDashboard/>
             </Route>
           </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
