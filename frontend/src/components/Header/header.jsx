import React, { useEffect } from "react";
import './header.css';
import Logo from '../../../src/img/argentBankLogo.webp'; // Chemin mis à jour
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../reducer/authUserSlice'; // Action correcte importée

function Header() {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Utilisez `state.user` ici
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user);

    const handleSignOut = () => {
        dispatch(logout()); // Utilisez `logout` ici
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            // Vous pourriez avoir une action pour vérifier ou récupérer l'utilisateur ici
            // Par exemple, dispatch(fetchUserData());
        }
    }, [dispatch]);

    return (
        <header>
            <Link to="/">
                <img className="logo" src={Logo} alt="logo Argent Bank" />
            </Link>
            <nav>
                {isAuthenticated ? (
                    <>
                        <Link to="/user" className="link">
                            <i className="fa fa-user-circle icon-header"></i>
                            {userProfile.userName ? userProfile.userName : userProfile.firstName}
                        </Link>
                        <Link to="/login" onClick={handleSignOut} className="link">
                            <i className="fa fa-sign-out icon-header"></i>
                            Se Déconnecter
                        </Link>
                    </>
                ) : (
                    <Link to="/login" className="link">
                        <i className="fa fa-user-circle icon-header"></i>
                        Se Connecter
                    </Link>
                )}
            </nav>
        </header>
    );
}

export default Header;
