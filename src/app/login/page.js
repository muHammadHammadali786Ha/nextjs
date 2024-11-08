'use client'
import AuthProvider, { AuthContext } from '@/context/store';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

const Login = () => {
  const {login} = useContext(AuthContext);
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });


  const onChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) =>{

    e.preventDefault();

    console.log(userData);
    
    const response = await axios.post('http://localhost:7001/api/users/login',userData);
   console.log(response.data);
   if (response.data.success == true) {
      login(response.data.user,response.data.token);
      router.push('/');
   }
   
  }


  return (
    <>

    <div className='flex justify-center items-center  min-h-screen' suppressHydrationWarning={true}>
      <form className='w-[400px] flex flex-col gap-5 py-4 px-4 shadow-lg rounded-md bg-[#F8F9FA]' onSubmit={onSubmitHandler}>
        <h1 className='text-center text-3xl font-bold'>Login Now</h1>
      
        <div>
          <input type='email' name='email' value={userData.email}
            className='w-full py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler}
            placeholder='Enter your emial'
            required
          />
        </div>

        <div>
          <input type='password' name='password' value={userData.password}
            className='w-full py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler}
            placeholder='Enter your password'
            required
          />
        </div>

        <div className=''>
          <button type='submit' className='w-full px-8 py-2 text-white text-xl font-bold bg-[#28A745] hover:bg-[#218838] rounded-md'>Login</button>
        </div>

        <div>
          <p className=''>If you have not account  <Link href={'/signup'} className='text-blue-500 font-bold'>Sign up</Link> </p>
        </div>
      </form>

      

    </div>
    </>
  )
}

export default Login