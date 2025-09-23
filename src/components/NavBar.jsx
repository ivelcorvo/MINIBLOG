import { NavLink,useLocation } from "react-router-dom";
import { useAuthActions } from "../hooks/useAuthActions";
import { useAuth } from "../hooks/useAuth"; 
import { useState,useEffect } from "react";
import { useDarkModeContext } from "../hooks/useDarkModeContext";

const NavBar = () => {
  const {darkMode,toggleDarkMode} = useDarkModeContext();

  const{user} = useAuth();
  // console.log(user);

  // #### LOGOUT ####
    const{logout} = useAuthActions();

  // #### COLLASPSE BTN MENU ####
    const [collapse,setCollapse] = useState(false);
    const location               = useLocation();

    useEffect(()=>{
      setCollapse(false);
    },[location]);

  // #### CLASSES ####
    const linkClass       = "block w-full px-5 py-2";
    const linkClassActive = "block w-full px-5 py-2 text-blue-600 font-bold";
    const classLiMenu     = `text-end ${(darkMode)?"hover:bg-gray-700":"hover:bg-gray-300"}`;
    const menuColor       = (darkMode)?"bg-gray-800":"bg-gray-200";
    // const btnColor       = (darkMode)?"bg-gray-800":"bg-gray-200";

  return (
    <>
      <header className={`${menuColor} shadow-md fixed w-full z-30`}>
        <nav className="w-full px-3 py-2 z-20">
          <div className="flex flex-row justify-between items-center">
            <h1 className=" ">MINI<strong>BLOG</strong></h1>
            <button onClick={()=>{setCollapse(!collapse)}} className="bg-blue-600 text-gray-200 rounded-sm shadow-md px-2 py-1 hover:cursor-pointer hover:scale-110">
              &#9776;
            </button>
          </div>
                            
          <ul className={`${menuColor} fixed top-12 right-0 flex flex-col h-full w-45 shadow-md transition-transform duration-500 z-30 ${(collapse)?"-translate-x-0":"translate-x-full"}`}>          
            {user &&
              <li>
                <p className="block px-5 text-center">{user.displayName}</p>
                <hr />
              </li>
            }
            <li className={classLiMenu}>
              <NavLink to={"/"}  className={({isActive})=>isActive ?linkClassActive:linkClass}>Início <i className="fa-solid fa-house"></i></NavLink>
            </li>        
            <li className={classLiMenu}>
              <NavLink to={"/about"} className={({isActive})=>isActive ?linkClassActive:linkClass}>Sobre <i className="fa-solid fa-circle-info"></i></NavLink>
            </li>
            {user && 
              <>
                <li className={classLiMenu}>
                  <NavLink to={"/post/create"} className={({isActive})=>isActive ?linkClassActive:linkClass}>Criar Post <i className="fa-solid fa-clone"></i></NavLink>
                </li>
                <li className={classLiMenu}>
                  <NavLink to={"/dashboard"}   className={({isActive})=>isActive ?linkClassActive:linkClass}>Painel <i className="fa-solid fa-table-columns"></i></NavLink>
                </li>
              </>
            }
            {!user &&
              <>
                <li className={classLiMenu}>
                  <NavLink to={"/login"}    className={({isActive})=>isActive ?linkClassActive:linkClass}>Login <i className="fa-solid fa-right-to-bracket"></i></NavLink>
                </li>
                <li className={classLiMenu}>
                  <NavLink to={"/register"} className={({isActive})=>isActive ?linkClassActive:linkClass}>Cadastrar-se <i className="fa-solid fa-id-card"></i></NavLink>
                </li>
              </>
            }   
            <li className={classLiMenu}>
              <button 
                onClick={()=>{toggleDarkMode()}} 
                className={`${linkClass} hover:cursor-pointer text-end`}
              >
                Tema {(darkMode)?<i className="fa-solid fa-moon"></i>:<i className="fa-solid fa-sun"></i>}
              </button>
            </li> 
            {user &&
              <li className={classLiMenu}>
                {/* hover:text-blue-400 hover:cursor-pointer px-5 py-5 */}
                <button onClick={()=>{logout()}} className={`${linkClass} hover:cursor-pointer text-end`}>Sair <i className="fa-solid fa-right-from-bracket"></i></button>
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