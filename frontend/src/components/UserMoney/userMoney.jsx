import React from 'react'
import '../UserMoney/userMoney.css'
import Button from '../Button/button';

function userMoney({ title, subtitle, content }) {
    return (
        <article className="account">
            <div className="account_content">
                <h3 className="account_title">{title}</h3>
                <span className="money">{content}</span>
                <p className="acount_subtitle">{subtitle}</p>
            </div>
            <Button content="View Transactions" />
        </article>
    )
}

export default userMoney
// Ce composant représente les informations sur le compte utilisateur, il peut être réutilisable.