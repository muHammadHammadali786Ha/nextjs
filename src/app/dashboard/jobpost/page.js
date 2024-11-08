import Link from 'next/link';
import React from 'react'

const JobPost = () => {
  return (
    <div>
        <h1 className='text-green'>Job Posting Route
        <Link href={'/dashboard/jobpost/createpost'}>Create Post</Link>
        </h1>
    </div>
  )
}

export default JobPost;