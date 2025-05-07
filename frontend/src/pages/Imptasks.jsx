import React, { useState } from 'react'
import Cards from '../components/home/Cards';
import { useEffect  } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

const Imptasks = () => {

  const[Data, setData]= useState();

  const headers = {
    id: localStorage.getItem("id"),
    authrization: localStorage.getItem("token")
  }

 useEffect(()=>{
  const fetch = async()=>{
  const response = await axios.get(`https://task-management-application-bkend.onrender.com/api/v1/getimptasks` , {headers} ); 
     setData(response.data.imptasks);
  }
  fetch();
  
 })

 const[loading, setLoading] = useState(true);
 useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1000);  

  // Cleanup the timer if the component unmounts
  return () => clearTimeout(timer);
}, []);
 

 


  return (
    <div className={`${loading&& 'flex justify-center items-center h-screen'}`}>
      {
        loading ? <Spinner/> :

        ( 
          Data && Data.length> 0 ?(
          <Cards  addTask={"false"} data={Data}/>
          )
          :

          <div className='flex justify-center items-center h-screen text-3xl text-gray-500'> No Important Task </div>

         )
        
      }
      
    </div>
  )
}

export default Imptasks
