import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import Loader from "../Sheared/Loader";
import Transaction from "./Transactions";
import Deposite from "./Deposite";
import Withdraw from "./Withdraw";
import NotVerified from "./NotVerified";
//console.log(token)

const Dashboard = () => {
    const [dbdata, setDbdata] = useState({});
    const [loading, setLoading] = useState(true);
    const [deposit, setDeposit] = useState(false);
    const [withdraw, setWithdraw] = useState(false);

    useEffect(() => {
        //console.log(window.location.href)
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
                "/api/auth/get_my_details",
                config
            );
            if (data) {
               // console.log('--',data, '--')
                setDbdata(data.data)
                setLoading(false)
            }
            
        }

         getUserData()
    },[])

    useEffect(() => {
        console.log(dbdata)
    },[dbdata])
  

   let pst = 0

    if(dbdata.plan==='Gold') {
        pst = (70*dbdata.ballance)/100
    } else if (dbdata.plan==='Silver') {
        pst = (50*dbdata.ballance)/100
    } else if (dbdata.plan==='Bronze'){
        pst = (40*dbdata.ballance)/100
    }
    else{
        pst = 0
    }

    if (loading) {
       // console.log('loading')
        return <Loader />

    }
    if (!dbdata.verified) {
        // console.log('loading')
        return <NotVerified />

     }
  return (
      <div className="dashboard">
          {deposit && <Deposite setDeposit={setDeposit} btcadd={dbdata.btcAdd} />}
          {withdraw&&<Withdraw setWithdraw={setWithdraw} ballance={dbdata.ballance+pst}/>}
          <div className="d-name"><small >Hello</small> {dbdata.username}</div>
          <div className="d-top">
            <div className="d-to-sec">
                <div className="d-to-sec-top">
                    <div className="d-to-sec-top-c">Subscription</div>
                    <div className="d-to-sec-top-c-s">{ dbdata.plan}</div>
                  </div>
                  
                <div className="d-to-sec-bott">
                      <div>
                        <div className="d-to-sec-bott-c-s">Balance</div>
                        <div className="d-to-sec-bott-c">${dbdata.ballance}.00</div>
                      </div>
                      <div>
                        <div className="d-to-sec-bott-c-s">Interest</div>
                        <div className="d-to-sec-bott-c">${pst}.0</div>
                      </div>
                      
                </div>
            </div>
          </div>
          {dbdata.plan !== 'No Plans'?
              <div className="db-btn-sec">
                <button className='db-deposit' onClick={()=>setDeposit(!deposit)}>Deposit</button>
                <button className='db-withdraw' onClick={()=>setWithdraw(!withdraw)}>Withdraw</button>
              </div>:<div className="db-btn-sec">
                <a href="/plans" className='db-select-plan'>Select a plan</a>
              </div>
          }
          <small>withdraw are availabe after 48hr</small>
          <div className="db-recent">Recent Transactions</div>
          <div className="db-trans">
              {
                  dbdata.Transactions.map((e, i) => {
                      return <Transaction
                          key={i}
                          date={e.date}
                          type={e.type}
                          amount={e.amount}
                          status={e.status}
                          last={e.user.lastTransfer}
                      />
                })
              }
          </div>
    </div>
  );
};

export default Dashboard;
