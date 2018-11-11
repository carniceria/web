import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Home } from './views/Home/Home';
import { AboutUs } from './views/AboutUs/AboutUs';
import { DetailProject } from './views/DetailProject/DetailProject';
import { NotFound } from './views/NotFound/NotFound';
import sal from 'sal.js';

require('dotenv').config()

require ('../node_modules/sal.js/dist/sal.css');

class App extends Component {
  render() {
    sal();
    return (
      <BrowserRouter>
        <Switch>
          <div className="body">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about-us/" component={AboutUs} />
              <Route path="/project/:projectId/" component={DetailProject} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
