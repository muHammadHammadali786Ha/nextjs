'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Signup = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    role:"student"
  });


  const onChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {

    e.preventDefault();

    // console.log(userData);
    if (userData.password === userData.confirm_password) {
      
      const response = await axios.post('http://localhost:7001/api/users/register', userData);
      // console.log(response);
      if (response.data.success == true) {
        router.push('/login');
      }
    }
    else{
        console.log("password not match");
    }

  }


  return (
    <div className='flex justify-center items-center  min-h-screen'>
      <form className='w-[400px] flex flex-col gap-5 py-4 px-4 shadow-lg rounded-md bg-[#F8F9FA]' onSubmit={onSubmitHandler}>
        <h1 className='text-center text-3xl font-bold'>Sign up Form</h1>
        <div>
          <input type='text' name='username' value={userData.username}
            className='w-full py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler}
            placeholder='Enter your username'
            required
          />
        </div>

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

        <div>
          <input type='password' name='confirm_password' value={userData.confirm_password}
            className='w-full py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler}
            placeholder='Enter your Confirm Password'
            required
          />
        </div>

        <div>
        <select name='role' id='role' className='w-full py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler} value={userData.role}>
            <option value={"student"}>Student</option>
            <option value={"employee"}>Employee</option>
            
          </select>
        </div>

        <div className=''>
          <button type='submit' className='w-full px-8 py-2 text-white text-xl font-bold bg-[#28A745] hover:bg-[#218838] rounded-md'>Sign up</button>
        </div>

        <div>
          <input type="checkbox" required />
          <label className='flex gap-2'>
            I agree to the terms and conditions
          </label>
        </div>
        <div>
          <p className=''>You have already account </p> <Link href={'/login'} className='text-blue-500 font-bold'>Login</Link>
        </div>
      </form>


    </div>
  )
}

export default Signup;