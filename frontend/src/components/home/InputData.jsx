 
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const InputData = ({showInputDiv,setShowInputDiv ,updatedData, setUpdatedData}) => {

  const[Data, setdata]= useState({title:"" , desc:""});

  function changeHandler(e){

    const{name, value}= e.target;
    setdata({...Data, [name]:value});

  }

  const headers = {
    id: localStorage.getItem("id"),
    authrization: localStorage.getItem("token")
  }


  async function submitHandler(e){

    if(Data.title==="" || Data.desc===""){

      alert("All fields are required");

    }
    else {

     const response = await axios.post(`https://task-management-application-bkend.onrender.com/api/v1/taskcreate` , Data , {headers});
    
    }
    setdata({title:"" , desc:""});
    setShowInputDiv(false);
  }

  useEffect(()=>{
    setdata({title:updatedData.title , desc:updatedData.desc});
  }, [updatedData])

  async function updateTaskHandler(){

    if(Data.title==="" || Data.desc===""){

      alert("All fields are required");

    }
    else {

     const response = await axios.put(`https://task-management-application-bkend.onrender.com/api/v1/updatetask/${updatedData.id}` , Data , {headers});
    
    }
   
    setUpdatedData({
      id:"",
      title:"",
      desc:""
    })
    setdata({title:"" , desc:""});
    setShowInputDiv(false);
  }

  


  

  return (
    <>

    <div className={` fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>

    <div className={` fixed top-0 left-0 flex items-center justify-center h-screen w-full`}>

        <div className='sm:4/6 md:3/6 lg:w-2/6  bg-gray-900  p-4 rounded'> 

        <div className='flex justify-end'> 
           <button className='text-2xl' onClick={()=>{
            setShowInputDiv(false) ;
            setdata({
              
              title:"",
              desc:""
            })
            setUpdatedData({
              id:"",
              title:"",
              desc:""
            })
          }}
            >
              <RxCross2 /></button>
        </div>
        
        <input type="text" placeholder='title' name='title' className='px-3 py-2 w-full  bg-gray-700 my-3' onChange={changeHandler} value={Data.title} />
        <textarea name="desc" placeholder='Description...' cols='30' rows='10' className='px-3 py-2 rounded w-full bg-gray-700 my-3' onChange={changeHandler} value={Data.desc}></textarea>


        {updatedData.id==="" ? 
         <button className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold' onClick={submitHandler}>Submit</button>
        :
        <button className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold' onClick={updateTaskHandler}>Update</button>
        }
        

       
        
        </div>

    </div>
    
    </>
  )
}

export default InputData
