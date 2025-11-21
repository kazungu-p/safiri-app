import React from "react";
import "./styles/marketing.css"
import Card from "./Card";

function Marketing({title, data, className}) {

    function getItem(cardItem){
        return <Card 
            key = {cardItem.key}
            image = {cardItem.image}
            heading = {cardItem.heading}
            description = {cardItem.description}
        />
    }

    return (
        <div className={`ad-container ${className || ""}`}>
            <h1>{title}</h1>
            <div className="card-container">
                {
                    data.map(getItem)
                }
            </div>
        </div>
    )
}

export default Marketing;