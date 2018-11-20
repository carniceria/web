import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Home } from './views/Home/Home';
import { AboutUs } from './views/AboutUs/AboutUs';
import { DetailProject } from './views/DetailProject/DetailProject';
import { DetailPeople } from './views/DetailPeople/DetailPeople';
import { NotFound } from './views/NotFound/NotFound';
import { GalaxyPage } from './views/GalaxyPage/GalaxyPage';
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
              <Route path="/people/:peopletId/" component={DetailPeople} />
              <Route path="/galaxy/" component={GalaxyPage} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
