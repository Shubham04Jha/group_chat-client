import {Link} from 'react-router-dom'

export const PageNotFound = ()=>{
  return(
    <div className='flex justify-center items-center w-full h-screen'>
      <div>
        <h1>404-Page Not Found...</h1>
        <Link to="/">Go Home</Link>
      </div>

    </div>
  )
}