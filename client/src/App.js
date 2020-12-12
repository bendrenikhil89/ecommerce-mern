import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import Navbar from './components/Navbar/Navbar';

import {auth} from './firebase';
import {useDispatch} from 'react-redux';
import Forgotpassword from './pages/auth/ForgotPassword';



function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
        })
      }

      return unsubscribe;
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
    </Switch>
    </>
  );
}

export default App;
