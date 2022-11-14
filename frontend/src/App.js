
import React from 'react'
import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Explore from './components/Explore/Explore'
import Visite from './components/Explore/Visite'
import Home from './components/Home/Home'
import Order from './components/order/Order'
import Ownerregister from './components/Auth/Ownerregister'
import Dashboard from './components/Dashboard/dashboard'
import Addfood from './components/Dashboard/Addfood'
import Cart from './components/cart/Cart'
function App() {
  return (
    <>
  
      
    <BrowserRouter>
            <Routes>
      
      <Route path='/' element={<Home />} /> 
      
      <Route path='/explore' element={<Explore />} /> 
      
      <Route path='/dashboard' element={<Dashboard />} /> 
      
      <Route path='/login' element={<Login />} /> 
      
      <Route path='/signup' element={<Register />} /> 
      
      <Route path='/addfooditem' element={<Addfood />} /> 
      
      
      <Route path='/cart' element={<Cart />} /> 
      
      <Route path='/ownersignup' element={<Ownerregister />} /> 

      
      <Route path='/orders' element={<Order />} /> 
      
      <Route path='/visite/:id' element={<Visite />} /> 
      </Routes>
    
      </BrowserRouter>
      
  
  
    </>
  )
}

export default App


