import React, {useState, useEffect} from 'react';
import { auth } from '../../firebase';
import { toast} from 'react-toastify';

const CompleteRegistration = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async(e) => {
        e.preventDefault();
        try{
            const result = await auth.signInWithEmailLink(email, window.location.href);

            if(result.user.emailVerified){
                window.localStorage.removeItem("emailForRegistration");
                let user = auth.currentUser;
                await user.updatePassword(password);
                const itTokenResult = await user.getIdTokenResult();

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
