import React from 'react'
import Sidebar from '../components/home/Sidebar'
import { Outlet } from 'react-router-dom'
import menuIcon from '../assets/logo.png';
import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { LuMenuSquare } from "react-icons/lu";
 

const Home = () => {
  const[menu , setMenu]= useState(false);
  const[hideBackground, setHidebackground] = useState(false);
 

  function menuHandler(){
    setMenu(!menu) 
    setHidebackground(!hideBackground);
   }

   

  return (

    <div className='  flex flex-row  h-[98vh]  bg-gray-900 gap-4 overflow-hidden '>

 
      <div className=   {`   bg-gray-900  h-screen  md:w-1/6   md:border-r-2 
       border-gray-500  p-4 md:flex   flex-col  hidden  justify-between`}> 
          <Sidebar setmenu={setMenu} setHidebackground={setHidebackground}/>  
          
        </div>

          {hideBackground &&(

             <div className={` fixed  top-0 left-0 bg-gray-800 opacity-80 h-screen w-full side-left transition-all duration-1000 md:hidden`}>     
          </div>

       )}
  
        <div className={`${menu?'block':'hidden'} md:hidden flex flex-col  gap-12 fixed top-16 h-full pl-4`}>
              <Sidebar  setmenu={setMenu} setHidebackground={setHidebackground}/>
        </div>
       
        <div className={`md:hidden block absolute pl-2 pt-3 w-full ${!menu&&'bg-gray-900'}  `}>
          {menu?<div className='pl-4'><RxCross2 onClick={menuHandler} className='text-2xl '/></div>:<LuMenuSquare onClick={menuHandler} className='text-2xl ' /> } 
        </div>
   
       
        
      
      
  

   <div className=' overflow-y-auto   sm:pt-3  mt-16 md:mt-0  bg-gray-900  md:w-5/6  w-full  p-4    md:h-screen'> <Outlet /> </div>
   
   
   
      
        
    </div>
  )
}

export default Home