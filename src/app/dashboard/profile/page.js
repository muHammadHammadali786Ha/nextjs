'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const Profile = () => {
  const [userData, setUserData] = useState({

  });


  return (
    <div className='flex flex-col gap-4'>
      <div className='flex space-x-4'>
        <div>
          <Image src="/hammad.jpg" alt="profile" width={100} height={100} className='rounded-lg' />
        </div>

        <div className='flex flex-col justify-center  gap-3 text-secondary font-bold'>
          <h2 className='text-3xl text-secondary font-bold'>Muhammad Hammad Ali</h2>
          <div className='flex space-x-2  '>

            <div className='flex space-x-2'>
              <Image src={'/email.png'} alt='email' className='' sizes='icon' width={15} height={15} />
              <p>hammad@example.com</p>
            </div>
            <div className='flex space-x-2'>
              <Image src={'/phone.png'} alt='email' className='' sizes='icon' width={20} height={15} />
              <p>0915778413148</p>
            </div>

            <div className='flex space-x-2'>
              <Image src={'/phone.png'} alt='email' className='' sizes='icon' width={20} height={15} />
              <p>Jauharabad</p>
            </div>
          </div>


        </div>
      </div>

      <div className=''>
        <div className='flex flex-col gap-2 py-2'>
          <h2 className='text-2xl font-bold'>Skills</h2>
          <div className='flex space-x-3 text-white'>
            <p className='bg-secondary rounded-full px-2 font-semibold'>Python</p>
            <p className='bg-secondary rounded-full px-2 font-semibold'>Html</p>
            <p className='bg-secondary rounded-full px-2 font-semibold'>Css</p>
            <p className='bg-secondary rounded-full px-2 font-semibold'>JavaScripts</p>
            <p className='bg-secondary rounded-full px-2 font-semibold'>MongoDB</p>
            <p className='bg-secondary rounded-full px-2 font-semibold'>MYSQL</p>
          </div>
        </div>

        <div className='flex flex-col gap-2 py-2'>
          <h2 className='text-2xl font-bold'>Education Section</h2>
          <div className='flex col-span-4'>
            <p className='text-primary font-semibold'>Degree : </p>
            <p> Bachelor of Science in Information Technology</p>
          </div>
          <div className='flex col-span-4'>
            <p className='text-primary font-semibold'>University : </p>
            <p> University of Education</p>
          </div>

        </div>

        <div className='flex flex-col gap-2 py-2'>
          <h2 className='text-2xl font-bold'>Cerificates</h2>
          <div className='flex flex-wrap gap-3 space-x-3 text-white'>
            <p className='bg-secondary rounded-full px-2 font-semibold'>Certified Kubernetes Administrator (CKA)</p>
            <p className='bg-secondary rounded-full px-2 font-semibold'>Google Cloud Professional Data Engineer</p>
            <p className='bg-secondary rounded-full px-2 font-semibold'>Certified Ethical Hacker (CEH)</p>
            <p className='bg-secondary rounded-full px-2 font-semibold'>Amazon Web Services</p>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile