import React from 'react';
import UserNav from '../../components/Navbar/UserNav';

const History = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    User page
                </div>
            </div>
        </div>
    )
}

export default History;
