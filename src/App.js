import React, { Component } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { Home } from './views/Home/Home';
import { AboutUs } from './views/AboutUs/AboutUs';
import { DetailProject } from './views/DetailProject/DetailProject';
// import { NotFound } from './views/NotFound/NotFound';
import sal from 'sal.js';

require('dotenv').config()

require ('../node_modules/sal.js/dist/sal.css');

class App extends Component {
  render() {
    sal();
    return (
      <Switch>
        <div className="body">
          <Route exact path="/" component={Home} />
          <Route path="/about-us/" component={AboutUs} />
          <Route path="/project/:projectId/" component={DetailProject} />
          {/* <Route component={NotFound} /> */}
          {/* <NotFound /> */}
      </div>
    </Switch>
    );
  }
}

export default App;
