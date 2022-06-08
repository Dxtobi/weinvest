import React, { useState, useEffect} from "react";
import {BsArrowRepeat} from 'react-icons/bs'
import axios from "axios";


const Dashboard = ({type, date, amount, status, address, user, _id}) => {
   
  const [uptodate, setDate]=useState(0)
 
  const end = new Date()
  const day = end.getDate()
  const month = end.getMonth()
  const year =end.getFullYear()
  const stdate = `${day}/${month}/${year}`
  
const dt = new Date(date)
const y = dt.getFullYear()
const m = dt.getMonth()
const w = dt.getDay()
  const d = dt.getDate()
  const h = dt.getHours()
const mt = dt.getMinutes()
const lds = `${d}/${m}/${y}`


const mnt = [
    'JEN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL','AUG','SEP','OCT','NOV','DEC'
]
const week = [
    'Sun', 'Mon', 'Tus', 'Wed', 'Thus', 'Fri',
    'Sat',
  ]
 
function getNumberOfDays(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 48;

  //console.log(date2.getTime(),'----', date1.getTime())
  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();
  console.log(oneDay, date2, diffInTime)
  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);
  
  return diffInDays;
}
useEffect(() => {
  setDate(getNumberOfDays(lds, stdate)) 
},[lds, stdate])
const handleSubmit = async (uid, amt, id) => {
         
    
   // console.log('www')
         const token = localStorage.getItem("authToken")
         const config = {
           headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
           },
         }
        try {
          const { data } = await axios.post(
            "/api/auth/confirm_transaction",
            {
                id: id,
                uid: uid,
                amount: amt,
                type:type
            },
            config
          );

          if (data) {
            window.location.reload()
          }
          //localStorage.setItem("authToken", data.token);
         
        } catch (error) {
        
          setTimeout(() => {
            //setError("");
          }, 3000);
        }
    };
    

    const failedTransaction = async (uid, amt, id) => {
         
    
        // console.log('www')
              const token = localStorage.getItem("authToken")
              const config = {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                },
              }
             try {
               const { data } = await axios.post(
                 "/api/auth/failed_transaction",
                 {
                     id: id,
                     uid: uid,
                     amount: amt,
                     type:type
                 },
                 config
               );
     
               if (data) {
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
        <div style={{marginBottom:30}}>
            <div  className="adm-confirm-menu">
          <div>{user.plan}</div>
          <div>{user.email}</div>
                <div>${ user.ballance}</div>
            </div>
            <div style={{borderColor:'red'}} className="db-trans-i">
              <div className="db-trans-i-l">
                  <BsArrowRepeat size={20} color='red'/>
                  <div className="db-trans-i-l-td">
                      <div style={{color:'red'}} className="db-trans-i-l-t">
                        {type}
                      </div>
                      <div className="db-trans-i-l-d">
                      {status} {d} {week[w]} {mnt[m]} {y}--{h}:{mt}
                      </div>
                  </div>
              </div>
              <div className="db-trans-i-r">
                ${amount}.00
                </div>
            </div>
            {address&&<div  className="db-btc_address">{address}</div>}
            <div className="adm-confirm-menu">
                {type==='Deposit'?<button
                    onClick={() => handleSubmit(user._id, amount, _id, type)}
                    style={{ background: '#009300'  }}
                    className="adm-confirm-button"
                    >Confirm</button> :
                    <button
                    onClick={() => handleSubmit(user._id, amount, _id, type)}
                    style={{ background: uptodate > 47 ? '#009300' : 'gray' }}
                    className="adm-confirm-button"
                    disabled={uptodate < 48 ? true : false}>Confirm</button>
                }
                <button  onClick={() => failedTransaction(user._id, amount, _id, type)}   style={{background:'#ff0000d9'}} className="adm-confirm-button">Delete</button>
            </div>
        </div>
    );
};

export default Dashboard;
