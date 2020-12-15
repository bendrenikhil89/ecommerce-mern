import React, {useState, useEffect} from 'react';
import { auth } from '../../firebase';
import { toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {createOrUpdateUser} from '../../utils/auth';

const CompleteRegistration = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {user} = useSelector(state => ({...state}));
    let dispatch = useDispatch();

    const submitHandler = async(e) => {
        e.preventDefault();
        try{
            const result = await auth.signInWithEmailLink(email, window.location.href);

            if(result.user.emailVerified){
                window.localStorage.removeItem("emailForRegistration");
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                createOrUpdateUser(idTokenResult.token)
                .then(res => {
                    dispatch({
                        type: 'LOGGED_IN_USER',
                        payload: {
                            email: res.data.newUser.email,
                            token: idTokenResult.token,
                            role: res.data.newUser.role,
                            _id: res.data.newUser._id,
                            name: res.data.newUser.name
                        }
                    })
                })
                .catch(err => console.log(err.message))
                history.push("/");
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
    }, [])
    const registerForm = () => {
        return <form onSubmit={submitHandler}>
            <input type="email" className="form-control" value={email} disabled />
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit" className="btn btn-raised">Submit</button>
        </form>
    }
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Complete Registration</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}

export default CompleteRegistration;
