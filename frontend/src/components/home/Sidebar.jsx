import React, { useEffect, useState } from 'react'

import { CgNotes } from "react-icons/cg";
import { MdLabelImportantOutline } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';
import toast from 'react-hot-toast'
 
 

const Sidebar = ({setmenu , setHidebackground}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Data , setData]= useState();
 

  const [menu , setMenu] = useState("All tasks");

  const data=[
    {
      title:"All tasks",
      icon:<CgNotes/>,
      link :"/"
    },

    {
      title:"Important tasks",
      icon:<MdLabelImportantOutline/>,
      link:"/imptasks"

    },

    {
      title:"Completed tasks",
      icon: <FaCheckDouble />,
      link : "/comptasks"
    },

    {
      title:"Incompleted tasks",
      icon:<TbNotebookOff />,
      link:"incomptasks"
    }
  ];

  const logoutHandler=()=>{

    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    navigate('/login');
    toast.success('Logged Out');
    
  }

  const headers = {
    id: localStorage.getItem("id"),
    authrization: localStorage.getItem("token")
  }

 useEffect(()=>{

  const fetch = async()=>{
    const response = await axios.get(`https://task-management-application-bkend.onrender.com/api/v1/gettasks`,{headers} );
    // console.log(response);
      setData(response.data.alltasks);
  }

  if(localStorage.getItem("id") && localStorage.getItem("token")){  // check this otherwise it render an error for some secona
    fetch();
  }
 

 } , [])

 

  return (
 
    <>

      {Data && (
         <div className='h-[7rem]'>
            <h2 className='text-xl font-semibold'>{Data.username}</h2>
            <h4 className='mb-1 text-gray-400'>{Data.email}</h4>
            <hr />
        </div>
      )}
       
        



         
     
       
       <div className={`  md:h-2/6 flex   flex-col  relative   h-full  `}>

         
     {data.map((items,i)=>(
            <Link to={items.link} onClick={()=>{
              setHidebackground(false) 
              setmenu(false)
            }}
            className='my-2 flex items-center gap-2 hover:bg-gray-600 p-2 rounded transition-all duration-300  '>  
              
              {items.icon}
              {items.title} </Link>
          ))}

        <div className='block md:hidden'>
          <button className={`bg-gray-600 p-3 rounded w-full  md:text-lg text-xs mt-8 `} onClick={logoutHandler}>Log Out</button>
        </div>

     

       </div>
        
         
          

        <div>
          <button className={`bg-gray-600 p-3 rounded w-full hidden md:block  md:text-lg text-xs `} onClick={logoutHandler}>Log Out</button>
        </div>

        </>



        

   
  )
}

export default Sidebar
