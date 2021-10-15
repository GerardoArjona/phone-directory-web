import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';

import Layout from './components/Layout';
import Signup from './components/Signup';

import { isLoggedIn } from './services/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route  {...rest} render={
      (props) => (
        isLoggedIn() ? <Component {...props} /> : <Redirect to="/signin" />
      )
  }>
  </Route>
)

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/signup" component={Signup}/>,
          <PrivateRoute path="/" component={Signup}/>,
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
