import React from 'react'
import { Link } from "react-router-dom";
//MdVerified
import { MdVerified } from 'react-icons/md';
export default function Verifiy() {
  

  return (
    <div className="reset-page">
     

      
      <div className='confirmed'>
        <p>
         Email Verified!
              </p>
              <br/>
              <MdVerified size={60} color='green' />
              <br/>
         <Link to='/dashboard' className='reset'>Back</Link>
      </div>
    </div>
  )
}
