import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AdminPage from './pages/AdminPage';

AdminFeature.propTypes = {};

function AdminFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.url} component={AdminPage} />
      </Switch>
    </div>
  );
}

export default AdminFeature;
