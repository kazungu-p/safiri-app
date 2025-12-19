import React, { useState } from "react";
import destinations from "../assets/data/destinations";
import { useNavigate } from "react-router-dom";

function BookingForm() {
  const navigate =useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  function handleFromChange(event) {
    setFrom(event.target.value);
    setTo("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/travel")
  }

  const toOptions = from ? destinations[from] : [];

  return (
    <form onSubmit={handleSubmit}>
     
        <select value={from} onChange={handleFromChange}>
          <option value="" disabled>
            From
          </option>
          {Object.keys(destinations).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          value={to}
          onChange={(event) => setTo(event.target.value)}
          disabled={!from}
        >
          <option value="" disabled>
            To
          </option>
          {toOptions.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

      <button type="submit" disabled={!from || !to}>
        Search
      </button>
    </form>
  );
}

export default BookingForm;
