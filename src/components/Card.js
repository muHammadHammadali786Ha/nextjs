'use client'
import React, { useEffect, useState } from 'react'
// import { jobPosts } from './data'
// import { jobPosts } from './data'
import axios from 'axios'

const Card = () => {
    const [jobListing,setJobListin] = useState([]);
    const getData = async () =>{
      const response = await axios.get('https://www.arbeitnow.com/api/job-board-api');
      console.log("Response ",response.data);
      setJobListin(response.data.data)
      
    }

    useEffect(()=>{
        getData();
    },[])
  return (
    <div className='container mx-auto'>
    <div className='grid grid-cols-2 md:grid-cols-3 gap-10'>    
        {
            jobListing.map((item,index)=>{
              return(
                <div key={index} className='w-full shadow-lg px-4 py-2 flex flex-col gap-3 rounded-md'>
                  <p className='font-semibold'>Title : {item.title}</p>
                  <p>Company : {item.company_name}</p>
                  <p>Location : {item.location}</p>
                  <p className='flex gap-4'>JobType : {item.job_types.map((item,index)=>{
                    return(
                      <>
                        <span key={index}>{item}</span>
                      </>
                    )
                  })}</p>
                  <p>Salary : {item.salary}</p>
                  {/* <p>Description : {item.description}</p> */}

                </div>
              )
            })
        }
        </div>
    </div>
  )
}

export default Card