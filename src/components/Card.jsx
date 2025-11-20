import React from "react";

function Card(props){
    return(
        <div className="card">
            <img src={props.image}/>
            <h3>{props.heading}</h3>
            <p>{props.description}</p>
        </div>
    )
}

export default Card;