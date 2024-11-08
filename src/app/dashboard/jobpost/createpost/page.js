'use client'
import React, { useState } from 'react'
useState
const CreatePost = () => {
  const [jobData, setJobData] = useState({
    title: "",
    department: "",
    jopType: "",
    locations: "",
    salary: "",
    descriptions: "",
    requirements: "",
    deadline: "",
  });
  const onChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <div>
        <form className='flex flex-col gap-7'>  
            <h2 className='text-3xl text-primary font-bold'>Create Job <span className='text-secondary'>Post</span> </h2>
            <div className='w-full flex justify-around gap-7'>
                <input type='text' name='title' id='title' placeholder='job title'  className='w-1/2 py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler}/>
           
                <input type='text' name='department' id='department' placeholder='job department'  className='w-1/2 py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler}/>
            </div>

            <div className='w-full flex justify-around gap-7'>

              <select name='jopType' id='jopType' placeholder='job Type'  className='w-1/2 py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler}>
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>InternShip</option>
              </select>
          
                <input type='text' name='locations' id='location' placeholder='Location'  className='w-1/2 py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler}/>
            </div>
            
            <div>
                <input type='text' name='salary' id='salary' placeholder='Salary'  className='w-full py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler}/>
            </div>

            <div>
              <textarea name='description' placeholder='Description'  className='w-full py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler}>

              </textarea>
               
            </div>

            <div>
                <input type='text' name='requirements' id='requirments' placeholder='Requirements'  className='w-full py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler}/>
            </div>

            <div>
                <input type='date' name='deadline' id='deadline' placeholder='Dead Line'  className='w-full py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler}/>
            </div>

            <div className=''>
          <button type='submit' className='w-full px-8 py-2 text-white text-xl font-bold bg-[#28A745] hover:bg-[#218838] rounded-md'>Post Now</button>
        </div>
        </form>
    </div>
  )
}

export default CreatePost