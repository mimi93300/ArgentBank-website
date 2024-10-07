import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUsername } from "../../reducer/authUserSlice.js"
import axios from "axios"

import Formular from "../Formular/Formular.jsx"
import Button from "../Button/Button.jsx"

import "./editUserName.css"

function EditUserName() {
    const dispatch = useDispatch()
    const userProfile = useSelector((state) => state.user) // récupération des données user
    const userToken = useSelector((state) => state.user.token) // récupération du token

    const [isOpen, setIsOpen] = useState(false) // formulaire fermé par défaut
    const [editedName, setUserName] = useState(userProfile.userName) // définit état username

    // Fermeture formulaire d'édition + save
    const saveMonney = async (event) => {
        event.preventDefault()
        try {
            // Envoie requête API
            const response = await axios.put( //méthode PUT est utilisée pour modifier le nom d'utilisateur (userName)
                "http://localhost:3001/api/v1/user/profile",
                {
                    userName: editedName, // userName est envoyée avec la nouvelle valeur du nom d'utilisateur (editedName)
                },
                {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            )
            if (response.status === 200) {
                const respData = response.data // extrait les données de la réponse de la requête
                dispatch(updateUsername(editedName)) // mise à jour username dans store
                setIsOpen(false)
            } else {
                if (response.status === 401) {
                    const errorData = response.data
                    console.error("Error 401 - editName : ", errorData.message)
                }
                if (response.status === 400) {
                    const errorData = response.data
                    console.error("Error 400 - editName : ", errorData)
                } else {
                    // Gestion pour une autre erreur
                    console.error("Error - editName : ", response.statusText)
                }
            }
        } catch (error) {
            // Gestion des erreurs liées à la requête
            console.error("Une autre erreur - editName : ", error)
        }
    }

    useEffect(() => {
        setUserName(userProfile.userName) // mise à jour username pour userProfile
        console.log("useEffect object : ", userProfile.userName)
    }, [userProfile.userName])

    return (
        <section className="section-user">
            {!isOpen ? (
                // Mode édition désactivé
                <>
                    <h2 className="title-user">
                        Welcome back
                        <br />
                        {!userProfile.userName ? (
                            <>
                                {userProfile.firstName} {userProfile.lastName}
                            </>
                        ) : (
                            <>{userProfile.userName} </>
                        )}
                        !
                    </h2>
                    <Button
                        content="Edit Name"
                        onClick={() => {
                            setIsOpen(true)
                        }}
                    />
                </>
            ) : (
                // Mode édition activé
                <>
                    <h2 className="title-user">Edit user info</h2>
                    <div className="modal">
                        <form onSubmit={saveMonney}>
                            <Formular 
                                label="User Name :" 
                                type="text" 
                                content="userName" 
                                placeholder={userProfile.userName} // Ajout du placeholder pour le nom d'utilisateur actuel
                                onChange={(event) => setUserName(event.target.value)} 
                            />
                            <Formular 
                                label="First Name :" 
                                type="text" 
                                content="firstName" 
                                placeholder={userProfile.firstName} // Ajout du placeholder pour le prénom actuel
                            />
                            <Formular 
                                label="Last Name :" 
                                type="text" 
                                content="lastName" 
                                placeholder={userProfile.lastName} // Ajout du placeholder pour le nom de famille actuel
                            />
                            <div className="userButton">
                                <Button content="Save" width="80px" height="40px" />
                                <Button
                                    content="Cancel"
                                    onClick={() => {
                                        setIsOpen(false)
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                </>
            )}
        </section>
    )
}

export default EditUserName
