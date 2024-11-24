import React, { useEffect } from "react";
import './header.css';
import Logo from '../../../src/img/argentBankLogo.webp';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../reducer/authUserSlice';

function Header() {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user);

    const handleSignOut = () => {
        dispatch(logout());
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            // Ici, vous pourriez avoir une action pour vérifier ou récupérer les données utilisateur
        }
    }, [dispatch]);

    return (
        <header>
            <Link to="/">
                <img className="logo" src={Logo} alt="logo Argent Bank" />
            </Link>
            <nav className="header_nav">
                {isAuthenticated ? (
                    <>
                        <Link to="/profile" className="link">
                            <i className="fa fa-user-circle icon-header"></i>
                            {userProfile.userName ? userProfile.userName : userProfile.firstName}
                        </Link>
                        <Link to="/login" onClick={handleSignOut} className="link">
                            <i className="fa fa-sign-out icon-header"></i>
                            Sign Out
                        </Link>
                    </>
                ) : (
                    <Link to="/login" className="link">
                        <i className="fa fa-user-circle icon-header"></i>
                        Sign In
                    </Link>
                )}
            </nav>
        </header>
    );
}

export default Header;

