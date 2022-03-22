import AdminFeature from 'features/Admin';
import LoginPage from 'features/Auth/pages/LoginPage';
import CartFeature from 'features/Cart';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ErrorPage from './components/ErrorPage/ErrorPage';
import UserLoginPage from './features/Auth/pages/UserLoginPage';
import Product from './features/Product/product.jsx';
import ProductDetail from './features/ProductDetail/ProductDetail';
function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Product} />
        <Route path="/login1" component={UserLoginPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/admin" component={AdminFeature} />
        <Route path="/cart" component={CartFeature} />
        <Route path="/productDetails/:id" exact component={ProductDetail} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
