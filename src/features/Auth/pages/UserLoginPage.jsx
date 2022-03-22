import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import UserLogin from '../components/UserLogin/UserLogin'
UserLoginPage.propTypes = {};

function UserLoginPage(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.url} component={UserLogin} />
      </Switch>
    </div>
  );
}
export default UserLoginPage;
