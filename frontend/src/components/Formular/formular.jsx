import React from 'react'
import './formular.css'


function formular({ label, type, content, value, onChange, placeholder }) {
    return (
        <div className='form_content'>
            <label htmlFor={content}>{label}</label> {/*lier l'étiquette au champ, avec la même valeur que l'attribut id du champ (content). */}
            <input type={type} id={content} name={content} value={value} placeholder={placeholder} onChange={onChange} />
        </div>
    )
}

export default formular