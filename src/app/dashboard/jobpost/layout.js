const Layout = ({children}) => {
    return (
      <div className='flex'> 
          <div className='flex-grow'>
              {children}
          </div>
      </div>
    )
  }
  
  export default Layout