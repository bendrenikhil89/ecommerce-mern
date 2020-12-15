import React, {useState} from 'react';
import { auth } from '../../firebase';
import UserNav from '../../components/Navbar/UserNav';
import {toast} from 'react-toastify';

const Password = () => {
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        await auth.currentUser.updatePassword(password)
        .then(() => {
            setLoading(false);
            toast.success("Password updated successfully");
        })
        .catch(err => {
            setLoading(false);
            toast.error(err.message);
        })
    }

    const passwordUpdateForm = () => {
        return <form onSubmit={submitHandler}>
            <div class="form-group">
                <label>Your Password</label>
                <input type="password" onChange={e => setPassword(e.target.value)} value={password} className="form-control" placeholder="Enter new password" disabled={loading} />
                <button className="btn btn-primary" disabled={!password || password.length < 6 || loading}>Submit</button>
            </div>
        </form>
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    <h4>Password Update</h4>
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    )
}

export default Password;