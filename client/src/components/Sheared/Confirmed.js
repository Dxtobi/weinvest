import React, { useEffect }from 'react'
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { MdVerified } from 'react-icons/md';
export default function Verifiy() {
  const history = useHistory()

  useEffect(() => {
    console.log(window.location.href)
    const token = localStorage.getItem("authToken")
    
    async function getUserData()
    {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            },
       };
        const { data } = await axios.get(
            "/api/auth/verify_mail",
            config
        );
      if (data) {
          console.log('---', data)
          history.push('/dashboard')
        }
        
    }

     getUserData()
},[])

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
