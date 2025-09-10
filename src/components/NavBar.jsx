import { NavLink,useLocation } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";
import { useState,useEffect } from "react";

const NavBar = () => {

  const{user} = useAuthValue();
  // console.log(user);

  // #### LOGOUT ####
    const{logout} = useAuthentication();

  // #### COLLASPSE BTN MENU ####
    const [collapse,setCollapse] = useState(false);
    const location               = useLocation();
    // # CLASSES
    const linkClass       = "block w-full px-5 py-2";
    const linkClassActive = "block w-full px-5 py-2 text-blue-600 font-bold";
    const classLiMenu     = "hover:bg-gray-700 text-end";

    useEffect(()=>{
      setCollapse(false);
    },[location]);

  return (
    <>
      <header className="bg-gray-800 shadow-md fixed w-full z-30">                                
        <nav className="w-full px-3 py-2 z-20">
          <div className="flex flex-row justify-between items-center">
            <h1 className=" ">MINI<strong>BLOG</strong></h1>
            <button onClick={()=>{setCollapse(!collapse)}} className="bg-gray-600 hover:bg-gray-700 rounded-xl shadow-md px-2 py-1 hover:cursor-pointer hover:scale-110">
              &#9776;
            </button>
          </div>
                            
          <ul className={`bg-gray-800 fixed top-11 right-0 flex flex-col h-full w-45 shadow-md transition-transform duration-500 z-30 ${(collapse)?"-translate-x-0":"translate-x-full"}`}>          
            {user &&
              <li>
                <p className="block px-5 text-center">{user.displayName}</p>
                <hr />
              </li>
            }
            <li className={classLiMenu}>
              <NavLink to={"/"}  className={({isActive})=>isActive ?linkClassActive:linkClass}>Home</NavLink>
            </li>        
            <li className={classLiMenu}>
              <NavLink to={"/about"} className={({isActive})=>isActive ?linkClassActive:linkClass}>About</NavLink>
            </li>
            {user && 
              <>
                <li className={classLiMenu}>
                  <NavLink to={"/post/create"} className={({isActive})=>isActive ?linkClassActive:linkClass}>Create Post</NavLink>
                </li>
                <li className={classLiMenu}>
                  <NavLink to={"/dashboard"}   className={({isActive})=>isActive ?linkClassActive:linkClass}>Dashboard</NavLink>
                </li>
              </>
            }
            {!user &&
              <>
                <li className={classLiMenu}>
                  <NavLink to={"/login"}    className={({isActive})=>isActive ?linkClassActive:linkClass}>Login</NavLink>
                </li>
                <li className={classLiMenu}>
                  <NavLink to={"/register"} className={({isActive})=>isActive ?linkClassActive:linkClass}>Register</NavLink>
                </li>
              </>
            }    
            {user &&
              <li className={classLiMenu}>
                {/* hover:text-blue-400 hover:cursor-pointer px-5 py-5 */}
                <button onClick={()=>{logout()}} className={`${linkClass} hover:cursor-pointer text-end`}>Logout</button>
              </li>
            }   
          </ul>
        </nav>       
      </header>
      {collapse &&
        <div className="fixed inset-0 bg-black/50 z-20" onClick={()=>{setCollapse(!collapse)}}></div>
      }
    </>
  )
}

export default NavBar