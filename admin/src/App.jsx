import React from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"


function App() {

  return (
    <>
      <Navbar/>
      <hr />
      <div className="app-items-container">
        <Router>
          <Routes>
            <Route/>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
