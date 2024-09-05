import React from 'react'
import "./home.css"
import img_chat from "../../../src/img/icon-chat.webp";
import img_money from "../../../src/img/icon-money.webp";
import img_security from "../../../src/img/icon-security.webp";

import Features from '../../components/Features/features.jsx';
import Banner from '../../components/Banner/banner.jsx';


function home() {
    return (
        <main className='main_home'>
            <Banner />
            <div className='Features_card'>
                <Features
                    image={img_chat}
                    alt="icône chat"
                    title="You are our #1 priority"
                    content="Need to talk to a representative? You can get in touch  
                    through our 24/7 chat or through a phone call in less than 5 minutes."
                />
                <Features
                    image={img_money} alt="icône de billet" title="More savings means higher rates" content="The more you save with us, the higher your interest rate will be!" />

                <Features
                    image={img_security} alt="icône d'un bouclier de sécurité" title="Security you can trust" content="We use top of the line encryption to make sure your data and money is always safe." />
            </div>
        </main>
    )
}

export default home
// Ce composant home définit la structure de la page d'accueil de l'application
// il reprend la "banner" et "feature" ainsi que
//les images et les contenus des caractéristiques sont fournis en tant que données statiques.