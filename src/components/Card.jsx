import React from "react";

function Card(props){
    return(
        <div className="card">
            <img src={props.image}/>
            <div className="card-text">
                <h3>{props.heading}</h3>
                <p>{props.description}</p>
            </div>
            
        </div>
    )
}

export default Card;