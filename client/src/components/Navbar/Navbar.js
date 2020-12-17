import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, AppstoreOutlined, UserAddOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import firebase from 'firebase/app';
import {useDispatch, useSelector} from 'react-redux';

const { SubMenu, Item } = Menu;

const Navbar = () => {
    const [current, setCurrent] = useState('home');
    let dispatch = useDispatch();
    let history = useHistory();
    let {user} = useSelector(state => ({...state}));

    const handleClick = e => {
        setCurrent(e.key);
    };

    const logoutHandler = () => {
      firebase.auth().signOut();
      dispatch({
        type: "LOG_OUT",
        payload: null
      })
      history.push('/login');
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Item>

        {!user && <Item key="login" icon={<UserOutlined />}>
          <Link to="/login">Login</Link>
        </Item>}

        {!user &&<Item key="register" icon={<UserAddOutlined />}>
          <Link to="/register">Register</Link>
        </Item>}

        {user && <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title="Dashboard"
        >
            {user && user.role === "subscriber" ? (<Item key="dashboard"><Link to="/user/history">Dashboard</Link></Item>) : (<Item key="dashboard"><Link to="/admin/dashboard">Dashboard</Link></Item>)}
            <Item key="logout" icon={<LogoutOutlined />} onClick={logoutHandler}>Log out</Item>
        </SubMenu>}
      </Menu>
    )
}

export default Navbar
