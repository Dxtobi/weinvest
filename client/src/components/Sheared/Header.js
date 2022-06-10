import React,
{ useState, useEffect }
  from "react";
import { CgMenuRight } from 'react-icons/cg';
import Navemenu from './Navemenu'
import Navemenu1 from './Navmenu'
import axios from "axios";
import "./header.css";
import { useHistory } from "react-router-dom";


const Header = () => {
  const [menunav, showMenu] = useState(false)
  const [error, setError] = useState(false);
  const [privateInfo, setPrivateInfo] = useState("");
  let history = useHistory();
  
  useEffect(() => {
    //console.log(window.location.href)
    const token = localStorage.getItem("authToken")
    async function getUserData() {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      };
      const { data } = await axios.get(
        "/api/auth/get_my_details",
        config
      );
      if (data) {
        // console.log('--',data, '--')
        setPrivateInfo(data.data)
        setError(false)
      } else {
        setError(true)
      }
        
    }

     getUserData()
},[])

  
  const handleOnClick = () => {
    console.log(privateInfo)
    toggle()
    localStorage.removeItem("authToken");

    history.push("/login");
    window.location.reload()
  };
  const toggle = () => {
    showMenu(!menunav)
  }
  return (
      <div className="header_top">
        <span className="header_top_brand">Weinvestbtc</span>
        <button onClick={()=>showMenu(!menunav)} className='menu-header-btn'><CgMenuRight size={25} /></button>
      {menunav && error?<Navemenu1 logout={handleOnClick} showMenu={toggle}/>:menunav && !error &&<Navemenu privateInfo={privateInfo} logout={handleOnClick} showMenu={toggle}/>}
      </div>
  );
};

export default Header;
