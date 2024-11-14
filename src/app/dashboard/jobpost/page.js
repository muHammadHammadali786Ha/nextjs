'use client'
import { AuthContext } from '@/context/store';
import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'

const JobPost = () => {
  const { auth } = useContext(AuthContext);
  const [jobList, setJobList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:7001/api/jobs/view/',
        {
          headers: {
            'Authorization': `Bearer ${auth.token}`, // Send the token in the Authorization header
            'Content-Type': 'application/json',
          }
        }
      );
      // console.log(response.data);

      if (response.data.success == true) {
        setJobList(response.data.jobListing);
        // console.log(jobList);
        // setJobList(response.data.jobListing);

      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth.token]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:7001/api/jobs/delete/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${auth.token}`, // Send the token in the Authorization header
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data.success == true) {
        fetchData();
      }
    } catch (e) {
      console.log(e.message);
    }
  }


  return (
    <div className='flex flex-col mt-2'>
      <div className='flex justify-between items-center h-10'>
        <h1 className='text-2xl font-bold'>List of Post
        </h1>
        <Link href={'/dashboard/jobpost/createpost'} className='py-1 px-3 bg-primary text-white font-bold rounded-md'>Create Post</Link>
      </div>

      <table className='w-full my-2  text-white '>
        <thead className='bg-secondary'>
          <tr className='grid grid-cols-4 text-center'>
            <th className='text-lg font-bold'>Title</th>
            <th className='text-lg font-bold'>Department</th>
            <th className='text-lg font-bold'>Location</th>
            <th className='text-lg font-bold' colSpan={3}>Action</th>
          </tr>
        </thead>

        <tbody className=' text-secondary'>
          {
            jobList.map((item) => (
              <tr key={item._id} className='grid grid-cols-4 text-center my-2'>
                <td>
                  {item.title}
                </td>
                <td>
                  {item.department}
                </td>
                <td>
                  {item.location}
                </td>
                <td className='flex gap-4 items-center text-white'>
                  <Link href={'/'} className='py-1 px-3 bg-secondary rounded-lg'>View</Link>
                  <Link href={`/dashboard/jobpost/update/${item._id}`} className='py-1 px-3 bg-primary rounded-lg'>Update</Link>
                  <p className='py-1 px-3 bg-red-600 rounded-lg cursor-pointer' onClick={() => { handleDelete(item._id) }}>Del</p>
                </td>
              </tr>
            
            ))
          }
        </tbody>

      </table>
    </div>
  )
}

export default JobPost;