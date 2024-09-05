import React, { useState } from "react";
import './profile.css'; // Assurez-vous que le fichier CSS est bien nommé 'profile.css'
import axios from "axios"; // bibliothèque JS pour effectuer des requêtes HTTP.
import Button from '../../components/Button/button.jsx'; // Chemin correct vers le composant Button
import Formular from '../../components/Formular/formular.jsx'; // Chemin correct vers le composant Formular

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Pour la mise à jour des valeurs
import { login } from '../../reducer/authUserSlice.js'; // Modifier l'importation

function Profile() { // Changement du nom du composant en Profile

    const navigate = useNavigate(); // useNavigate pour la navigation entre les pages
    const dispatch = useDispatch(); // useDispatch pour dispatcher des actions Redux

    // Stockage des valeurs du formulaire
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [remember, setRemember] = useState(false);

    // Gérer l'envoi du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            email: email,
            password: password,
        };
        // Envoi requête vers l'API pour faire la connexion
        try {
            const response = await axios.post("http://localhost:3001/api/v1/user/login",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

            // Vérification que la requête a réussi
            if (response.status === 200) {
                const responseData = response.data; // récupération des données
                const token = responseData.body.token; // pour récupérer le token (auth)
                localStorage.setItem("authToken", token); // enregistrement du token
                dispatch(login({ token })); // envoi action au store (utilisateur connecté!)
                navigate("/User"); // redirection vers la page utilisateur
            } else {
                setErrorMessage(response.statusText); // Mise à jour du message d'erreur
            }
        } catch (error) {
            // Gestion des erreurs non prévues
            setErrorMessage("An error has occurred."); // Mise à jour du message d'erreur
        }
    };

    return (
        <main className="main-profile">
            <section className="section-profile">

                <div className="form_header">
                    <i className="fa fa-user-circle"></i>
                    <h2>Sign In</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    {errorMessage && <p className="error-login">{errorMessage}</p>}

                    <Formular label="Username" content="email" type="email" onChange={(event) => setEmail(event.target.value)} required />
                    <Formular label="Password" content="password" type="password" onChange={(event) => setPassword(event.target.value)} required />

                    <div className="login_check">
                        <input type="checkbox" id="remember" name="check-remember" onChange={() => setRemember(!remember)} checked={remember} />
                        <label htmlFor="remember">Remember me</label>
                    </div>

                    <Button style={{ textDecoration: "underline" }} content="Sign In" className="btn-login" />
                </form>
            </section>
        </main>
    );
}

export default Profile; // Exportation du composant avec le nom corrigé
