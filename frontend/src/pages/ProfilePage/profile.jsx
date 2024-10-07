import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import EditUserName from "../../components/EditUserName/EditUserName.jsx";
import UserMoney from "../../components/UserMoney/UserMoney.jsx";
import '../ProfilePage/profile.css';
import { userProfile } from '../../reducer/authUserSlice.js';
import accountData from "../../accountData.json"; // Importation des données

function User() {
    const dispatch = useDispatch();

    // Utilise useCallback pour mémoriser fetchDataProfile et éviter sa recréation à chaque rendu
    const fetchDataProfile = useCallback(async (authToken) => {
        try {
            const response = await axios.post(
                "http://localhost:3001/api/v1/user/profile",
                {},
                {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            
            if (response.status === 200) {
                const responseData = response.data.body;
                dispatch(userProfile(responseData)); // Utilise userProfile pour mettre à jour les informations utilisateur dans Redux
            } else {
                console.error("Error response: ", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    }, [dispatch]);

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (authToken) {
            fetchDataProfile(authToken);
        }
    }, [fetchDataProfile]); // Ajoute fetchDataProfile dans la liste des dépendances

    return (
        <main className="main_user">
            <EditUserName />
            <section className="card">
                {accountData.accounts.map((account, index) => (
                    <UserMoney 
                        key={index}
                        title={account.title} 
                        content={account.content} 
                        subtitle={account.subtitle} 
                    />
                ))}
            </section>
        </main>
    );
}

export default User;

