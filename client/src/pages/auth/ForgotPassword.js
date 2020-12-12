import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast} from 'react-toastify';
import { useSelector } from 'react-redux';

const Forgotpassword = ({history}) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(state => ({...state}));
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const config = {
                url: process.env.REACT_APP_FORGET_PASSWORD_REDIRECT_URL,
                handleCodeInApp: true
            }
            await auth.sendPasswordResetEmail(email, config);
            toast.success("Password reset link has been sent to the registered email address.")
        }
        catch(err){
            setLoading(false);
            toast.error(err.message);
        }
    }

    useEffect(() => {
        if(user && user.token){
            history.push("/") 
        }
    }, [user]);
    return (
        <div className="container col-md-6 offset-md-3 p-5">
            <h4>Forgot Password</h4>
            <form onSubmit={submitHandler}>
                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" autoFocus />
                <br />
                <button className="btn btn-raised" disabled={!email}>Submit</button>
            </form>
        </div>
    )
}

export default Forgotpassword;