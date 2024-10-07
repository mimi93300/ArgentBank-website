import React, { useState } from "react"
import './login.css'
import axios from "axios"; // bibliothèque JS pour effectuer des requêtes HTTP.
import Button from '../../components/Button/Button.jsx';
import Formular from '../../components/Formular/Formular.jsx';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Pour la mise à jour des value
import { login } from '../../reducer/authUserSlice.js'; // Modifier l'importation


function Login() {

    const navigation = useNavigate() // useNavigate pour la navigation entre les pages
    const dispatch = useDispatch() // useDispatch pour dispatcher des actions Redux

    // Stockage des valeurs form
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [remember, setRemember] = useState(false)

    // Gérer l'envoie du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = {
            email: email,
            password: password,
        }
        // Envoie requête vers l'api pour faire la connexion
        try {
            const setRequest = await axios.post("http://localhost:3001/api/v1/user/login",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

            // Vérification que la requête a réussi
            if (setRequest.status === 200) {
                const responseData = setRequest.data // récupération des données
                const token = responseData.body.token // récupération du token (auth)
                localStorage.setItem("authToken", token) // enregistrement du token
                dispatch(login({ token })) // envoie action au store (utilisateur connecté!)
                navigation("/profile") // redirection vers page utilisateur
            } else {
                setErrorMessage(setRequest.statusText) // Pour la mise à jour du message d'erreur
            }
        } catch (error) {
            // Gestion des erreurs non prévues
            setErrorMessage("An error has occurred.") // Mise à jour du message d'erreur
        }
    }

    return (
        <main className="main-login">
            <section className="section-login">

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

    )
}

export default Login
