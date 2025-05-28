import Stdbar from '@/components/stdbar'
import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='flex gap-3'>
        <div>
            <Stdbar/>
        </div>

        <div className='flex-grow'>
            {children}
        </div>
    </div>
  )
}

export default Layout