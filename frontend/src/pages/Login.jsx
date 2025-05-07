import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../store/auth';
import logo from '../assets/logo.png';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast'
 


const Login = () => {

   
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const[loading, setLoading] = useState(false);

  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
  if(isLoggedIn == true){
    navigate('/')
  }

  const [Data, setData]= useState({username:"" , password:""});

  function changeHandler(event){

    const{name , value}= event.target;
    setData({...Data , [name]:value});
  }

  async function submitHandler(event){

    // event.preventDefault();
    setLoading(true);

         
    try{
       if(Data.username===""|| Data.password===""){
      toast.error("All field is required");
      setLoading(false);

    }
    else {
      
     
     const response =  await axios.post(`https://task-management-application-bkend.onrender.com/api/v1/login` , Data);
   
    
     setData({username:"" , password:""});
     localStorage.setItem("id" , response.data.id);
     localStorage.setItem("token" , response.data.token);
      //  console.log(response);

     dispatch(authActions.login());
     setLoading(false);
      navigate('/');
      toast.success("Logged In");
      
     

    }
  }
   catch(err){

    setLoading(false);
    toast.error(err.response.data.message);
    navigate('/login');
    setData({username:"" , email:"" , password:""});
    


    }
    

    }



  return (
    <div className='flex items-center justify-center h-[98vh]'>

      {loading ? <Spinner/>

      :

     

        <div className='bg-gray-800 lg:w-2/6 md:3/6 sm:4/6 flex flex-col justify-start rounded p-4 '>

        <div className='flex items-center my-6'>
          <img src={logo} alt=""  className='w-[40px] h-[30px]'/>
          <h1 className='text-2xl font-semibold'>Task Management</h1>
        </div>
          
          <div className='text-3xl  mb-3 h-[50px] font-bold overflow-hidden'>LogIn in to your Account</div>

          <input required type="text" placeholder='username' className='px-5 py-4 w-full my-3 bg-gray-700 rounded' name='username' onChange={changeHandler} value={Data.username}/>
          <input required type="password"  placeholder='password' className='px-5 py-4 w-full my-3 bg-gray-700 rounded' name='password' onChange={changeHandler} value={Data.password} />

         

           

             <button className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 my-3 rounded w-full' onClick={submitHandler}>Login</button>
             

             <Link to='/signup' className='text-gray-400 text-center hover:text-gray-200 '>Not having an account? Signup here !</Link>

            

        
        </div>
}
    </div>
  )
}

export default Login
