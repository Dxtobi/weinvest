import React from "react";
import {BsArrowDown, BsArrowUpRight, BsArrowRepeat} from 'react-icons/bs'

const Dashboard = ({type, date, amount, status, last}) => {
  // const [uptodate, setDate]=useState(0)
 
  const end = new Date()
 // const day = end.getDate()
 // const month = end.getMonth()
  //const year =end.getFullYear()
  //const stdate = `${day}/${month}/${year}`
  
const dt = new Date(date)
const y = dt.getFullYear()
const m = dt.getMonth()
const w = dt.getDay()
  const d = dt.getDate()
  const h = dt.getHours()
const mt = dt.getMinutes()
//const lds = `${d}/${m}/${y}`


const mnt = [
    'JEN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL','AUG','SEP','OCT','NOV','DEC'
]
const week = [
    'Sun', 'Mon', 'Tus', 'Wed', 'Thus', 'Fri',
    'Sat',
  ]
  


if (status ===  "Pending")
{
    return (
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
               {type==='Withdraw'&& '-'}${amount}.00
             </div>
        </div>
      );
}
  if ( status === "Received")
    {
        return (
            <div className="db-trans-i">
                  <div className="db-trans-i-l">
                      <BsArrowDown size={20} color='green'/>
                      <div className="db-trans-i-l-td">
                          <div className="db-trans-i-l-t">
                            {type}
                          </div>
                          <div className="db-trans-i-l-d">
                          {status} {d} {week[w]} {mnt[m]} {y}--{h}:{mt}
                          </div>
                      </div>
                  </div>
                  <div className="db-trans-i-r">
                  {type==='Withdraw'&& '-'}${amount}.00
                 </div>
            </div>
          );
  }
  
    return (
        <div style={{borderColor:'red'}} className="db-trans-p">
              <div className="db-trans-i-l">
                  <BsArrowUpRight size={20} color='red'/>
                  <div className="db-trans-i-l-td">
                      <div className="db-trans-i-l-t">
                        {type}
                      </div>
                      <div className="db-trans-i-l-d">
                      {status} {d} {week[w]} {mnt[m]} {y}--{h}:{mt}
                      </div>
                  </div>
              </div>
              <div className="db-trans-i-r">
              {type==='Withdraw'&& '-'}${amount}.00
             </div>
        </div>
      );
};

export default Dashboard;
