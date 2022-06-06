import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adm.css";
import Loader from "../Sheared/Loader";
import Transaction from "./Transactions";
import { GiAnimalSkull } from "react-icons/gi";

//console.log(token)

const Adm = () => {
   
      
    const [dbdata, setDbdata] = useState({});
    const [loading, setLoading] = useState(true);
    const [pass, setPass] = useState(false);
    const [passw, setPassword] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => {
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
                "/api/auth/get_all_transaction_details",
                config
            );
            if (data) {
                console.log(data.trans[0])
                setDbdata(data.trans)
                setLoading(false)
            }
            
        }

         getUserData()
    }, [])
    
//weinvestbtc.com
    useEffect(() => {
        console.log(dbdata)
    },[dbdata])
  
    const checkPass = () => {
        if (user === 'smile4119' && passw === '1Connected.') {
            setPass(true)
        }
    }


    if (loading) {
       // console.log('loading')
    return <Loader/>
    }
    if (!pass) {
        // console.log('loading')
        return (<div className="password-adm">
                    <GiAnimalSkull size={30}/>
                    <div className="password-adm-info">PASSWORD</div>
                    <input onChange={(e)=>setUser(e.target.value)} value={user} type='text' className='adm-pass' />
                    <input onChange={(e)=>setPassword(e.target.value)} value={passw} type='password' className='adm-pass' />
                    <button className='adm-pass' onClick={checkPass} >NEXT</button>
                </div>
        )
     }
  return (
      <div className="Adm">
          
          
          <div className="db-recent">Recent Transactions</div>
          <div className="db-trans">
              {
                  dbdata.map((e, i) => {
                      return <Transaction
                          key={i}
                          date={e.date}
                          type={e.type}
                          amount={e.amount}
                          status={e.status}
                          address={e.address}
                          user={e.user}
                          _id={e._id}
                      />
                })
              }
          </div>
    </div>
  );
};

export default Adm;
