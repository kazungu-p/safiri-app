import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getSchedules } from "../assets/data/schedules";
import "../assets/styles/booking.css";

function todayString() {
  return new Date().toISOString().split("T")[0];
}

function StepIndicator({ step }) {
  const steps = ["Select Trip", "Choose Seat", "Checkout"];
  return (
    <div className="step-indicator">
      {steps.map((label, i) => (
        <React.Fragment key={i}>
          <div className={`step-dot ${step > i ? "done" : step === i ? "active" : ""}`}>
            {step > i ? "✓" : i + 1}
            <span className="step-label">{label}</span>
          </div>
          {i < steps.length - 1 && <div className={`step-line ${step > i ? "done" : ""}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function ScheduleStep({ from, to, onSelect }) {
  const [date, setDate] = useState(todayString());
  const schedules = getSchedules(from, to);
  return (
    <div className="booking-step">
      <h2 className="step-title">Available Buses</h2>
      <p className="route-label">
        <span>{from}</span> <span className="route-arrow">→</span> <span>{to}</span>
      </p>
      <div className="date-picker-row">
        <label>Travel Date</label>
        <input type="date" value={date} min={todayString()} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="schedule-list">
        {schedules.map((s) => (
          <div key={s.id} className="schedule-card">
            <div className="schedule-times">
              <span className="time dep">{s.departure}</span>
              <span className="duration">{s.duration}</span>
              <span className="time arr">{s.arrival}</span>
            </div>
            {s.overnight && <span className="overnight-badge">Overnight</span>}
            <div className="schedule-classes">
              <button className="class-btn economy" onClick={() => onSelect({ schedule: s, seatClass: "economy", date })}>
                Economy<br /><strong>KES {s.economyPrice.toLocaleString()}</strong>
              </button>
              <button className="class-btn business" onClick={() => onSelect({ schedule: s, seatClass: "business", date })}>
                Business<br /><strong>KES {s.businessPrice.toLocaleString()}</strong>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SeatMapStep({ from, to, schedule, seatClass, date, onConfirm, onBack }) {
  const [takenSeats, setTakenSeats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const price = seatClass === "economy" ? schedule.economyPrice : schedule.businessPrice;

  useEffect(() => {
    async function fetchTaken() {
      try {
        const params = new URLSearchParams({ from, to, departureTime: schedule.departure, travelDate: date });
        const res = await fetch(`http://localhost:3000/api/bookings/taken?${params}`);
        const data = await res.json();
        setTakenSeats(data.takenSeats || []);
      } catch {
        setTakenSeats([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTaken();
  }, [from, to, schedule, date]);

  function renderEconomySeats() {
    const rows = [];
    for (let row = 0; row < 10; row++) {
      const rowSeats = [];
      for (let col = 0; col < 4; col++) {
        const seatNum = row * 4 + col + 1;
        const isTaken = takenSeats.includes(seatNum);
        const isSelected = selected === seatNum;
        rowSeats.push(
          <button key={seatNum} className={`seat ${isTaken ? "taken" : isSelected ? "selected" : "available"}`}
            disabled={isTaken} onClick={() => setSelected(seatNum)} title={`Seat ${seatNum}`}>
            {seatNum}
          </button>
        );
        if (col === 1) rowSeats.push(<div key={`gap-${row}`} className="seat-gap" />);
      }
      rows.push(<div key={row} className="seat-row"><span className="row-num">{row + 1}</span>{rowSeats}</div>);
    }
    return rows;
  }

  function renderBusinessSeats() {
    const rows = [];
    for (let row = 0; row < 3; row++) {
      const rowSeats = [];
      for (let col = 0; col < 2; col++) {
        const seatNum = 40 + row * 2 + col + 1;
        const isTaken = takenSeats.includes(seatNum);
        const isSelected = selected === seatNum;
        rowSeats.push(
          <button key={seatNum} className={`seat business-seat ${isTaken ? "taken" : isSelected ? "selected" : "available"}`}
            disabled={isTaken} onClick={() => setSelected(seatNum)} title={`Seat ${seatNum}`}>
            {seatNum}
          </button>
        );
      }
      rows.push(<div key={row} className="seat-row"><span className="row-num">{row + 1}</span>{rowSeats}</div>);
    }
    return rows;
  }

  return (
    <div className="booking-step">
      <h2 className="step-title">Pick Your Seat</h2>
      <p className="route-label">
        <span>{from}</span> <span className="route-arrow">→</span> <span>{to}</span>
        <span className="meta"> · {schedule.departure} · {date} · <strong className="class-tag">{seatClass}</strong></span>
      </p>
      {loading ? (
        <div className="loading-seats">Loading seat availability…</div>
      ) : (
        <>
          <div className="bus-wrap">
            <div className="bus-front">🚌 Front</div>
            <div className="seat-map">
              {seatClass === "economy" ? renderEconomySeats() : renderBusinessSeats()}
            </div>
          </div>
          <div className="seat-legend">
            <span className="legend-item"><span className="seat available small" /> Available</span>
            <span className="legend-item"><span className="seat selected small" /> Selected</span>
            <span className="legend-item"><span className="seat taken small" /> Taken</span>
          </div>
          {selected && (
            <div className="selected-info">
              Seat <strong>{selected}</strong> · KES <strong>{price.toLocaleString()}</strong>
            </div>
          )}
          <div className="step-actions">
            <button className="btn-back" onClick={onBack}>← Back</button>
            <button className="btn-next" disabled={!selected} onClick={() => onConfirm({ seatNumber: selected, price })}>
              Continue →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function CheckoutStep({ from, to, schedule, seatClass, seatNumber, price, date, onBack }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [stage, setStage] = useState("form");
  const [bookingRef, setBookingRef] = useState(null);
  const [error, setError] = useState("");

  async function handlePay(e) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !mpesaPhone.trim()) { setError("Please fill in all fields."); return; }
    setError(""); setStage("paying");
    try {
      const createRes = await fetch("http://localhost:3000/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, to, departureTime: schedule.departure, seatNumber, seatClass, passengerName: name, passengerPhone: phone, price, travelDate: date }),
      });
      const createData = await createRes.json();
      if (!createRes.ok || !createData.booking) { setError(createData.message || "Booking failed."); setStage("form"); return; }
      await new Promise((r) => setTimeout(r, 2500));
      const confirmRes = await fetch(`http://localhost:3000/api/bookings/${createData.booking._id}/confirm`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mpesaRef: `MP${Date.now()}` }),
      });
      const confirmData = await confirmRes.json();
      if (confirmRes.ok) { setBookingRef(confirmData.booking.mpesaRef); setStage("success"); }
      else { setError("Payment confirmation failed."); setStage("form"); }
    } catch { setError("Network error. Please check your connection."); setStage("form"); }
  }

  if (stage === "paying") {
    return (
      <div className="booking-step centered">
        <div className="mpesa-spinner">
          <div className="spinner" />
          <p>Waiting for M-Pesa payment…</p>
          <p className="mpesa-sub">Check your phone <strong>{mpesaPhone}</strong> and enter your PIN</p>
        </div>
      </div>
    );
  }

  if (stage === "success") {
    return (
      <div className="booking-step centered">
        <div className="success-box">
          <div className="success-icon">✓</div>
          <h2>Booking Confirmed!</h2>
          <p>M-Pesa Ref: <strong>{bookingRef}</strong></p>
          <div className="ticket-summary">
            <div className="ticket-row"><span>Route</span><span>{from} → {to}</span></div>
            <div className="ticket-row"><span>Date</span><span>{date}</span></div>
            <div className="ticket-row"><span>Departure</span><span>{schedule.departure}</span></div>
            <div className="ticket-row"><span>Seat</span><span>{seatNumber} ({seatClass})</span></div>
            <div className="ticket-row"><span>Passenger</span><span>{name}</span></div>
            <div className="ticket-row total"><span>Total Paid</span><span>KES {price.toLocaleString()}</span></div>
          </div>
          <button className="btn-next" onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-step">
      <h2 className="step-title">Checkout</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="ticket-row"><span>Route</span><span>{from} → {to}</span></div>
        <div className="ticket-row"><span>Date</span><span>{date}</span></div>
        <div className="ticket-row"><span>Departure</span><span>{schedule.departure}</span></div>
        <div className="ticket-row"><span>Seat</span><span>{seatNumber} ({seatClass})</span></div>
        <div className="ticket-row total"><span>Total</span><span>KES {price.toLocaleString()}</span></div>
      </div>
      <form className="checkout-form" onSubmit={handlePay}>
        <h3>Passenger Details</h3>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="e.g. Jane Mwangi" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" placeholder="07XXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <h3>Pay with M-Pesa</h3>
        <div className="mpesa-header">
          <img src="/images/payment-method.png" alt="M-Pesa" className="mpesa-logo" />
        </div>
        <div className="form-group">
          <label>M-Pesa Phone Number</label>
          <input type="tel" placeholder="07XXXXXXXX" value={mpesaPhone} onChange={(e) => setMpesaPhone(e.target.value)} required />
          <small>An STK push will be sent to this number</small>
        </div>
        {error && <p className="checkout-error">{error}</p>}
        <div className="step-actions">
          <button type="button" className="btn-back" onClick={onBack}>← Back</button>
          <button type="submit" className="btn-pay">Pay KES {price.toLocaleString()} →</button>
        </div>
      </form>
    </div>
  );
}

function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState({ schedule: null, seatClass: null, date: null, seatNumber: null, price: null });

  if (!from || !to) {
    return (
      <div className="booking-page no-route">
        <h2>No route selected</h2>
        <p>Please go back and search for a trip.</p>
        <button className="btn-next" onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <StepIndicator step={step} />
      {step === 0 && <ScheduleStep from={from} to={to} onSelect={(s) => { setSelection((p) => ({ ...p, ...s })); setStep(1); }} />}
      {step === 1 && <SeatMapStep from={from} to={to} schedule={selection.schedule} seatClass={selection.seatClass} date={selection.date}
        onConfirm={(s) => { setSelection((p) => ({ ...p, ...s })); setStep(2); }} onBack={() => setStep(0)} />}
      {step === 2 && <CheckoutStep from={from} to={to} schedule={selection.schedule} seatClass={selection.seatClass}
        seatNumber={selection.seatNumber} price={selection.price} date={selection.date} onBack={() => setStep(1)} />}
    </div>
  );
}

export default BookingPage;
