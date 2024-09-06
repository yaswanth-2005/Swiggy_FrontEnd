import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './SwiggyUI/pages/LandingPage'
import ProductMenu from './SwiggyUI/components/ProductMenu'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products/:firmId/:firmName" element={<ProductMenu />} />
      </Routes>
    </>
  )
}

export default App
