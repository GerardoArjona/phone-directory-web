import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';

import Layout from './components/Layout';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import NewContact from './components/NewContact';

import { isLoggedIn } from './services/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route  {...rest} render={
      (props) => (
        isLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />
      )
  }>
  </Route>
)

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/login" component={Signin}/>,
          <Route path="/signup" component={Signup}/>,
          <PrivateRoute path="/new-contact" component={NewContact}/>,
          <PrivateRoute path="/" exact component={Home}/>,
          <Redirect from='*' to='/' />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
