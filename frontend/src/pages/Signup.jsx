import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';
import toast from 'react-hot-toast'
import Spinner from '../components/Spinner';

const Signup = () => {

  const navigate = useNavigate();
  const[loading, setLoading] = useState(false);

  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
  if(isLoggedIn == true){
    navigate('/')
  }

  


  const [data, setData]= useState({username:"" , email:"" , password:""});

  function changeHandler(event){

    const{name , value}= event.target;
    setData({...data , [name]:value});
  }

  async function submitHandler(event){

    try{
       if(data.username==="" || data.email==="" || data.password===""){
      toast.error("All field is required");
      // alert("All field are required");
    }
    else {

      const emailRegex = /\S+@\S+\.\S+/;
      if( ! emailRegex.test(data.email)){
         toast.error("Please enter valid email");
      }
      else if(data.password.length<4){
        toast.error("Password must have at least of 4 characters")
      }
      else{
         setLoading(true);
        const response =  await axios.post(`https://task-management-application-bkend.onrender.com/api/v1/signup` , data);
       console.log(response);
      setLoading(false);
      toast.success("Account created ! Please Login ");
      navigate('/login');
      }
      
      }
    
    }
  
   catch(err){

    alert(err.response.data.message);
    navigate('/login');
    setData({username:"" , email:"" , password:""});


    }

    }

 
  return (

    <div className='flex items-center  bg-gray-900 justify-center h-[98vh]'>

     {loading ? <Spinner/> : 

      <div className='bg-gray-800 md:w-2/6 flex flex-col justify-start  max-w-[500px]  rounded p-4'>

        <div className='flex items-center my-6'>
          <img src={logo} alt=""  className='w-[40px] h-[30px]'/>
          <h1 className='text-2xl font-semibold'>Task Management</h1>
        </div>
          
          <div className='text-3xl  mb-3 h-[50px] font-bold overflow-hidden'>Signup in to your Account</div>


          <input required type="text" placeholder='username' className='px-5 py-4 w-full my-3 bg-gray-700 rounded' name='username' onChange={changeHandler} value={data.username} />
          <input required type="email" placeholder='email' className='px-5 py-4 w-full my-3 bg-gray-700 rounded' name='email' onChange={changeHandler} value={data.email}/>
          <input required type="password"  placeholder='password' className='px-5 py-4 w-full my-3 bg-gray-700 rounded' name='password' onChange={changeHandler} value={data.password} />

           
             <button className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded my-3' onClick={submitHandler}>SignUp</button>

             <Link to='/login' className='text-gray-400 text-center hover:text-gray-200'>Already have an account? Login here !</Link>

           

        
        </div>
     }
    
       

         


    </div>
  )
}

export default Signup
