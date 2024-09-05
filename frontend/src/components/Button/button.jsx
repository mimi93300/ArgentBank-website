import React from "react"

import "./button.css"

export default Button

function Button({ content, event, onClick }) {
    return (
        <button event={event} onClick={onClick}>
            {content}
        </button>
    )
}