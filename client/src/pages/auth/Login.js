import React, {useState, useEffect} from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast} from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {createOrUpdateUser} from '../../utils/auth';

const Login = ({history}) => {
    const [email, setEmail] = useState('burns121@gmail.com');
    const [password, setPassword] = useState('C00lBurns@1');
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(state => ({...state}));
    let dispatch = useDispatch();

    const roleBasedRedirect = res => {
        if(res.data.user.role === 'admin'){
            history.push('/admin/dashboard');
        }
        else {
            history.push('/user/history');
        }
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const result = await auth.signInWithEmailAndPassword(email, password);
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();
            createOrUpdateUser(idTokenResult.token)
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
                roleBasedRedirect(res);
            })
            .catch(err => toast.error(err.message))
            // history.push("/");
        }
        catch(err){
            setLoading(false);
            toast.error(err.message);
        }
    }

    const googleLoginHandler = async() =>{
        try{
            let result = await auth.signInWithPopup(googleAuthProvider);
            if(result){
                const {user} = result;
                const idTokenResult = await user.getIdTokenResult();
                createOrUpdateUser(idTokenResult.token)
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
                    roleBasedRedirect(res);
                })
                .catch(err => toast.error(err.message))
                // history.push("/");
             }
        }
        catch(err){
            toast.error(err.message);
        }
    }

    useEffect(() => {
        if(user && user.token){
            history.push("/") 
        }
    }, [user]);

    const loginForm = () => {
        return <form onSubmit={submitHandler}>
            <div className="form-group">
                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} autoFocus placeholder="Your email"/>
            </div>
            <div className="form-group">
                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}  placeholder="Your password"/>
            </div>
            <br/>
            <Button 
                loading={loading} 
                onClick={submitHandler} 
                type="primary" 
                block 
                shape="round" 
                className="mb-3" 
                icon={<MailOutlined />} 
                size="large" 
                disabled={!email || password.length < 6}
            >
                Login
            </Button>
            <Button 
                onClick={googleLoginHandler} 
                type="danger" 
                block 
                shape="round"
                className="mb-3" 
                icon={<GoogleOutlined />} 
                size="large" 
            >
                Login with Google
            </Button>
            <Link to="/forgotpassword" className="text-danger float-right">Forgot Password</Link>
        </form>
    }
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Login</h4>
                    {loginForm()}
                </div>
            </div>
        </div>
    )
}

export default Login;
