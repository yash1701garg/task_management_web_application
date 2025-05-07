import axios from 'axios';
import React, { useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import toast from 'react-hot-toast'
 
 

const Cards = ({addTask,setShowInputDiv , data , setUpdatedData}) => {

 

  const headers = {
    id: localStorage.getItem("id"),
    authrization: localStorage.getItem("token")
  }


   async function completeHandler(id){
   try{
    const response = await axios.put(`https://task-management-application-bkend.onrender.com/api/v1/updatecomptasks/${id}` ,{} , {headers} );
    // alert(response.data.message);
   }
   catch(err){
    console.log(err);
   }
  }


  async function importantTaskHandler(id){
    try{
 
     const response = await axios.put(`https://task-management-application-bkend.onrender.com/api/v1/updateimptasks/${id}` ,{} , {headers} );
    //  console.log(response);
    
    }
    catch(err){
     console.log(err);
    }
   }


   async function deleteHandler(id){
    try{
 
     const response = await axios.delete(`https://task-management-application-bkend.onrender.com/api/v1/deletetask/${id}` , {headers} );
    //  console.log(response);
    toast.success("Task Deleted");
    }
    catch(err){
     console.log(err);
    }
   }
 

   function handleUpdate(id, title , desc){
    setShowInputDiv(true);
    setUpdatedData({id:id , title:title, desc:desc})
   }

 

   
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  p-4 gap-4'>
        
        
        { data && data.map((items,i)=>(

            <div  className=' bg-gray-800 rounded-xl p-4 flex flex-col justify-between'>
             <div>
                <h1 className='text-xl font-semibold'>{items.title}</h1>              
                <p className='text-gray-300 my-2'>{items.desc}</p>
             </div>

              <div className='mt-4 w-full flex items-center'>

                <button 
                   className={`${items.complete===false? ' bg-red-400 ': 'bg-green-700'} p-2 rounded w-3/6`} onClick={ ()=>completeHandler(items._id)}>
                   {items.complete===true?"Completed ": "In Completed"} 
                   </button>

                <div className='  w-3/6 p-2 text-2xl flex justify-around '>
                    <button onClick={()=>importantTaskHandler(items._id)}>
                       {items.important==false?<CiHeart onClick={()=>toast.success('Added to Important')}/>:<FaHeart className='text-red-500' onClick={()=>toast.success('Remove from Important')}/>}</button>

                       {addTask==="true" && (
                         <button onClick={()=>handleUpdate(items._id , items.title, items.desc)}><FaEdit /></button>
                       )}
                       
                        
                    
                    <button onClick={()=>deleteHandler(items._id)}><MdDelete /></button>
                </div>

              </div>

            </div>

           
        ))}
      

         
         {addTask==="true" && 
         (
        <div  className=' text-gray-300 bg-gray-800 rounded-xl p-4 flex flex-col justify-center items-center 
                              hover:scale-105 hover:cursor-pointer transition-all duration-300 ' onClick={()=>setShowInputDiv(true)} >

            <MdAddCircle className='text-5xl' />
            <h1 className='text-2xl mt-4'>Add Task</h1>

        </div>
        
         )}
 

    </div>
  )
}

export default Cards
