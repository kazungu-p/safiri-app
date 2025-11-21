import React, { useState } from "react";
import destinations from "../assets/data/destinations";

function BookingForm(){

    function handleSubmit(event){
        event.preventDefault()
    }

    const[from, setFrom] = useState("");
    const[to, setTo] = useState("");

    const toOptions = from ? destinations[from] : [];

    return (
        <form onSubmit={handleSubmit}>
            <select value={from} onChange={(event)=>setFrom(event.target.value)}>
                <option value="" disabled >From</option>
                {Object.keys(destinations).map(city=>(
                    <option key={city} value={city}>{city}</option>
                ))}
            </select>
            <select value={to} onChange={(event) =>setTo(event.target.value)}>
                <option value ="" disabled >To</option>
                {toOptions.map(city => (
                    <option key={city} value={city}>{city}</option>
                ))}
            </select>
            
            <button type="submit" disabled={!from || !to}>Search</button> 
        </form>
    )

}

export default BookingForm;