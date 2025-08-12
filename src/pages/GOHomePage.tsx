
import {Link} from 'react-router-dom'

export const GOHomePage = ({message}:{message: string})=>{
  return(
    <div className='flex justify-center items-center w-full h-screen'>
      <div>
        <h1>{message}</h1>
        <Link to="/">Go Home</Link>
      </div>

    </div>
  )
}