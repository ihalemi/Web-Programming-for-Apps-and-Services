/*********************************************************************************
*  WEB422 –Assignment04*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Ilias Halemi Student ID: 062111133 Date: February 22, 2019
*
********************************************************************************/

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Overview from './Overview.js';
import Projects from './Projects.js';
import Teams from './Teams.js';
import Employees from './Employees.js';
import RouteNotFound from './RouteNotFound.js';

class App extends Component {
  render() {
    let url = "https://quiet-crag-62906.herokuapp.com/";
    return (
      <Switch>
        <Route exact path='/' render={() => (
          <Overview title="Overview" dataSource={url} />
        )}/>
        <Route exact path='/projects' render={() => (
          <Projects title="Projects" dataSource={url + "projects"} />
        )}/>
        <Route exact path='/teams' render={() => (
          <Teams title="Teams" dataSource={url + "teams"} />
        )}/>
        <Route exact path='/employees' render={() => (
          <Employees title="Employees" dataSource={url + "employees"} />
        )}/>
        <Route render={() => (
          <RouteNotFound title="Not Found" />
        )}/>
      </Switch>
    );
  }
}

export default App;