 import React, { useEffect, useState } from 'react';
 import Home from './pages/Home'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Alltasks from './pages/Alltasks';
import Imptasks from './pages/Imptasks';
import Completetasks from './pages/Completetasks';
import Incompletetasks from './pages/Incomplete';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useSelector , useDispatch } from 'react-redux';
import { authActions } from './store/auth';
 


 const App = ()=>{

 const dispatch = useDispatch();

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  
  const navigate = useNavigate();

  useEffect(()=>{

    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
    }
    else if(isLoggedIn==false){
    navigate('/signup ');
  }
  }, [])

   

  

  

  return (
    <div className=' bg-gray-900 text-white h-screen  p-2 relative  overflow-hidden'>

      

      <Routes>

      
        <Route  path='/' element={<Home  />}> 

          <Route index element = {<Alltasks />}/>
        
         <Route path='/imptasks' element = {<Imptasks/>}/>
         <Route path = '/comptasks' element={<Completetasks/>}/>
         <Route path='/incomptasks' element={<Incompletetasks/>}/>
         
        </Route>

        <Route path='/signup' element ={<Signup />}/>
        <Route path='login' element={<Login/>}/>
         
        
      </Routes>

      
         
    </div>
  )
 }

 export default App