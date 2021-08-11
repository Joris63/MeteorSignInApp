import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import {GuardedRoute} from '../guards/AuthGuard.js'
import { SignIn } from './SignIn.jsx';
import { Home } from './Home.jsx';

export const App = () => {
  
  const[isAutheticated, setisAutheticated] = useState(false);

  function handleAuthenticate(newValue) {
    setisAutheticated(newValue);
  }


  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={() => <SignIn onAuthenticate={handleAuthenticate} />}/>
          <GuardedRoute path="/home" component={Home} auth={isAutheticated} />
        </Switch>
      </Router>
    </div>
    );
}
