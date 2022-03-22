import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Login from '../components/Login/Login';
import './LoginPage.scss';

LoginPage.propTypes = {};

function LoginPage(props) {
  const match = useRouteMatch();
  return (
      <Switch>
        <Route path={match.url} component={Login} />
      </Switch>
  );
}

export default LoginPage;
