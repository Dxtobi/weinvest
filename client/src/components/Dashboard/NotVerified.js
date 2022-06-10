
import React, {useState} from "react";
import {AiOutlineMail, } from 'react-icons/ai'
import axios from "axios";


const Withdraw = ({  setWithdraw}) => {
    const [sent, setSent] = useState(false);

const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log('www')
  const token = localStorage.getItem("authToken")
  console.log(token)
         const config = {
           headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
           },
         }
        try {
          const { data } = await axios.get(
            "/api/auth/resend_mail",
            config
          );
            if (data) {
                setSent(true)
            window.location.reload()
          }
          //localStorage.setItem("authToken", data.token);
        } catch (error) {
          setTimeout(() => {
            //setError("");
          }, 3000);
        }
      };







    return (
        <div className="Not-verified">
            <div className='verified_'>
                {sent&&<div style={{color:'green', fontSize:20, marginTop:20}}>Sent</div>}
            <br/>
                <div className='style_txt'>Please verify Email</div>
                <br/>
                <AiOutlineMail className="db-menu-icon"/>
                <br/>
                <button className='style_btn' onClick={handleSubmit} >RESEND MAIL</button>
                <br/>
            </div>
            
            
            </div>
          );
    }
   

export default Withdraw;
