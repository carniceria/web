import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
      <Router>
        <div className="body">
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us/" component={AboutUs} />
          <Route exact path="/project/:projectId/" component={DetailProject} />
          <Route component={NotFound} />
      </div>
    </Router>
    );
  }
}

export default App;
