'use client';
import { AuthContext } from '@/context/store';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

const Update = ({ params }) => {
  const {id} =useParams();
  // todo create instance of the imported module's;
  const router = useRouter();
  const { auth } = useContext(AuthContext);

  // todo created state for managing the get data from api's. 
  const [jobData, setJobData] = useState({
    title: "",
    department: "",
    jobType: "Full Time",
    location: "",
    salary: "",
    descriptions: "",
    requirements: "",
    deadLine: "",
  });

  // const obj = {
  //   id:null
  // }
  
  // todo function for getting data from api's 
  const fetchData = async () => {
  //  let {id} = await params.id;/
    try {
      const response = await axios.get(`http://localhost:7001/api/jobs/view/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${auth.token}`, //! Send the token in the Authorization header
            'Content-Type': 'application/json',
          }
        }
      );
      console.log(response.data);

      if (response.data.success == true) {

        setJobData(response.data.jobListing)
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChangeHandler = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const {id} = await params
    const respone = await axios.put(`http://localhost:7001/api/jobs/update/${id}`,
      jobData,
      {
        headers: {
          'Authorization': `Bearer ${auth.token}`, // Send the token in the Authorization header
          'Content-Type': 'application/json',
        }
      }
    )
    console.log(respone.data);

    if (respone.data.success == true) {
      router.push('/dashboard/jobpost')
    }
  }

  return (
    <div>
      <form className='flex flex-col gap-7' onSubmit={onSubmitHandler}>
        <h2 className='text-3xl text-primary font-bold'>Create Job <span className='text-secondary'>Post</span> </h2>
        <div className='w-full flex justify-around gap-7'>
          <input type='text' name='title' id='title' placeholder='job title' className='w-1/2 py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler} value={jobData.title} />

          <input type='text' name='department' id='department' placeholder='job department' className='w-1/2 py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler} value={jobData.department} />
        </div>

        <div className='w-full flex justify-around gap-7'>

          <select name='jobType' id='jobType' placeholder='job Type' className='w-1/2 py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler} value={jobData.jobType}>
            <option value={"Full Time"}>Full Time</option>
            <option value={"Part Time"}>Part Time</option>
            <option value={"Internship"}>InternShip</option>
          </select>

          <input type='text' name='location' id='locations' placeholder='Location' className='w-1/2 py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler} value={jobData.location} />
        </div>

        <div>
          <input type='text' name='salary' id='salary' placeholder='Salary' className='w-full py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler} value={jobData.salary} />
        </div>

        <div>
          <textarea name='descriptions' placeholder='Description' className='w-full py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler} value={jobData.descriptions}>

          </textarea>

        </div>

        <div>
          <input type='text' name='requirements' id='requirments' placeholder='Requirements' className='w-full py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler} value={jobData.requirements} />
        </div>

        <div>
          <input type='date' name='deadLine' id='deadline' placeholder='Dead Line' className='w-full py-2 px-1 rounded-md bg-[#FFFFFF] border border-[#CED4DA] focus:outline-[#28A745]'
            onChange={onChangeHandler} value={jobData.deadLine} />
        </div>

        <div className=''>
          <button type='submit' className='w-full px-8 py-2 text-white text-xl font-bold bg-[#28A745] hover:bg-[#218838] rounded-md'>Post Now</button>
        </div>
      </form>
    </div>
  )
}

export default Update