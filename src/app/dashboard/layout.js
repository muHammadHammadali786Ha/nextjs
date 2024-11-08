import Sidebar from '@/components/sidebar'
import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='flex gap-3'>
        <div>
            <Sidebar/>
        </div>

        <div className='flex-grow'>
            {children}
        </div>
    </div>
  )
}

export default Layout