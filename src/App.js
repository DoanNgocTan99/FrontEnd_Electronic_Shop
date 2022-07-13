import AdminFeature from 'features/Admin';
import LoginPage from 'features/Auth/pages/LoginPage';
import CartFeature from 'features/Cart';
import Register from 'features/Register/Register';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ErrorPage from './components/ErrorPage/ErrorPage';
import UserLoginPage from './features/Auth/pages/UserLoginPage';
import Product from './features/Product/product.jsx';
import ProductDetail from './features/ProductDetail/ProductDetail';
import UserProfile from './features/UserProfile/UserProfile';
import PurchasedOrders from 'features/PurchasedOrders';

function App() {
  const adminState = useSelector((state) => state.admin);
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Product} />
        <Route path="/FrontEnd_Electronic_Shop" exact component={Product} />
        <Route path="/cart" component={CartFeature} />
        <Route path="/productDetails/:id" exact component={ProductDetail} />
        <Route path="/userProfile" component={UserProfile} />
        <Route path="/register" component={Register} />
        <Route path="/purchasedOrders" component={PurchasedOrders} />

        {adminState.current?.role === 'ADMIN' && (
          <Route path="/admin" component={AdminFeature} />
        )}

        {adminState.current === null && (
          <Route path="/login1" component={UserLoginPage} />
        )}

        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
