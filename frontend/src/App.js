import React from 'react';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route path='/404' component={NotFound} />
        <Redirect to='/404' />
      </Switch>
    </Router>
  );
}

export default App;
