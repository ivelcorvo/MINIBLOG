import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

const NavBar = () => {
  const linkClass       = "py-5 px-5 hover:text-blue-400";
  const linkClassActive = "py-5 px-5 text-blue-600 font-bold hover:text-blue-400";

  const{user} = useAuthValue();
  // console.log(user);

  const{logout} = useAuthentication();

  return (
    <header className="bg-gray-800 shadow-md flex flex-col sm:flex-row items-center justify-start px-4 sm:px-10 ">
      <h1 className="text-7xl sm:text-2xl mx-auto sm:mx-0 ">MINI<strong>BLOG</strong></h1>
      {user && 
        <p className="hidden sm:block px-20">Olá, {user.displayName}</p>
      } 
      <nav className="flex flex-wrap justify-center sm:jsutify-start">
        <NavLink to={"/home"}  className={({isActive})=>isActive ?linkClassActive:linkClass}>Home</NavLink>
        <NavLink to={"/about"} className={({isActive})=>isActive ?linkClassActive:linkClass}>About</NavLink>
        {user && 
          <>
            <NavLink to={"/post/create"} className={({isActive})=>isActive ?linkClassActive:linkClass}>Create Post</NavLink>
            <NavLink to={"/dashboard"}   className={({isActive})=>isActive ?linkClassActive:linkClass}>Dashboard</NavLink>
          </>
        }
        {!user &&
          <>
            <NavLink to={"/login"}    className={({isActive})=>isActive ?linkClassActive:linkClass}>Login</NavLink>
            <NavLink to={"/register"} className={({isActive})=>isActive ?linkClassActive:linkClass}>Register</NavLink>
          </>
        }    
        {user &&
          <button onClick={()=>{logout()}} className="hover:text-blue-400 hover:cursor-pointer px-5">Logout</button>
        }   
      </nav>       
    </header>
  )
}

export default NavBar