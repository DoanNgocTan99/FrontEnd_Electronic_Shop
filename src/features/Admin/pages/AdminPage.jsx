import SideBar from 'components/SideBar/SideBar';
import TopBar from 'components/TopBar/TopBar';
import StorageKeys from 'constants/storage-keys';
import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Category from '../components/Category/Category';
import Coupon from '../components/Coupon/Coupon';
import Customer from '../components/Customer/Customer';
import Dashboard from '../components/Dashboard/Dashboard';
import Order from '../components/Order/Order';
import Product from '../components/Product/Product';
import Setting from '../components/Setting/Setting';
import './Admin.scss';

AdminPage.propTypes = {};

function AdminPage(props) {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem(StorageKeys.TOKEN);
    if (!token) {
      history.replace('/login');
    }
  });

  return (
    <div>
      <TopBar />
      <div className="main-contain">
        <SideBar />
        <Switch>
          <Route path="/admin" exact>
            <Dashboard />
          </Route>

          <Route path="/admin/categories">
            <Category />
          </Route>

          <Route path="/admin/customers">
            <Customer />
          </Route>

          <Route path="/admin/products">
            <Product />
          </Route>

          <Route path="/admin/coupons">
            <Coupon />
          </Route>

          <Route path="/admin/orders">
            <Order />
          </Route>

          <Route path="/admin/settings">
            <Setting />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default AdminPage;
