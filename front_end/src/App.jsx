import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className='flex-grow'>
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={ <Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
