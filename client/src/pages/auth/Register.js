import React, {useState, useEffect} from 'react';
import { auth } from '../../firebase';
import { toast} from 'react-toastify';
import { useSelector } from 'react-redux';

const Register = ({history}) => {
    const [email, setEmail] = useState('')
    const {user} = useSelector(state => ({...state}));
    const submitHandler = async(e) => {
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }
        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`Email is sent to ${email}. Click the link to complete your registration.`);
        window.localStorage.setItem('emailForRegistration', email);
        setEmail('');
    }
    const registerForm = () => {
        return <form onSubmit={submitHandler}>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} autoFocus placeholder="Your email" />
            <br/>
            <button type="submit" className="btn btn-raised">Register</button>
        </form>
    }

    useEffect(() => {
        if(user && user.token){
            history.push("/") 
        }
    }, [user]);

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}

export default Register
