import React, { useState } from 'react'
import Navbar from './component/Navbar'
import Home from './component/Home'
import About from './component/About'
import Footer from './component/Footer'
import { Route, Routes } from 'react-router-dom'
import Result from './component/Result'
import Login from './component/Login'
import Signup from './component/Signup'
import Evaluate from './component/Evaluate'
import Dashboard from './component/Dashboard'
import Details from './component/Details'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [name,setName]=useState("")
  console.log(name)
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      
      <Routes>
        <Route path='/' element={<>
          <Navbar/>
      <Home/>
      <About/>
      <Footer/>
        </>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/login' element={<Login setName={setName}/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/Result-evaluate' element={<Evaluate/>}/>
        <Route path='/dashboard' element={<Dashboard name={name}/>}/>
        <Route path='/details/:id' element={<Details/>}/>
      </Routes>

      <ToastContainer 
        position="top-right"
        autoClose={2000}
        theme="dark"
      />
    </div>
  )
}

export default App