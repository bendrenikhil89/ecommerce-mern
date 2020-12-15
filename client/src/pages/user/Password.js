import React, {useState} from 'react';
import { auth } from '../../firebase';
import UserNav from '../../components/Navbar/UserNav';
import {toast} from 'react-toastify';

const Password = () => {
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const passwordUpdateForm = () => {
        return <form>
            form
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