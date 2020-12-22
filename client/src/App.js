import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import History from './pages/user/History';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import Navbar from './components/Navbar/Navbar';
import UserRoute from './components/Routes/UserRoute';
import AdminRoute from './components/Routes/AdminRoute';

import {auth} from './firebase';
import {useDispatch} from 'react-redux';
import Forgotpassword from './pages/auth/ForgotPassword';
import {currentUser} from './utils/auth';
import Password from './pages/user/Password';
import WishList from './pages/user/Wishlist';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';
import AllProducts from './pages/admin/product/AllProduct';
import ProductUpdate from './pages/admin/product/ProductUpdate';


function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
        .then(res => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: res.data.user.name,
              email: res.data.user.email,
              token: idTokenResult.token,
              role: res.data.user.role,
              _id: res.data.user._id
            }
          })
        }).catch(err => {
          toast.error(err.message);
        })
        
      }
  })
    return unsubscribe;
  }, [])

  return (
    <>
    <Navbar />
    <ToastContainer />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} /> 
      <Route exact path="/register/complete" component={CompleteRegistration} />
      <Route exact path="/forgotpassword" component={Forgotpassword} />
      <UserRoute exact path="/user/history" component={History} /> 
      <UserRoute exact path="/user/password" component={Password} /> 
      <UserRoute exact path="/user/wishlist" component={WishList} />
      <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      <AdminRoute exact path="/admin/category" component={CategoryCreate} />
      <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} /> 
      <AdminRoute exact path="/admin/sub" component={SubCreate} />
      <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} /> 
      <AdminRoute exact path="/admin/product" component={ProductCreate} />
      <AdminRoute exact path="/admin/products" component={AllProducts} />
      <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} /> 
    </Switch>
    </>
  );
}

export default App;
