import React, { Component } from 'react';
import { Switch, Link, Route, } from 'react-router-dom';
import About from './routes/About';
import Home from './routes/Home';

import routes from './routes';


export default class AppRouter extends Component {
  render() {
    return (
      <div>
        <Switch>
          {
            routes.map((route) => {
              return <Route {...route} />
            })
          }
        </Switch>
      </div>
    );
  }
}
