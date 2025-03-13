import Home from './pages/Home'
import Items from './pages/Items'
import Contractors from './pages/Contractors'
import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'


export default function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/contractors" element={<Contractors />} />
      </Routes>
    </>
  )
}
