import { NavLink } from "react-router-dom"

const NavBar = () => {

  const linkClass       = "py-5 px-5 hover:text-blue-400";
  const linkClassActive = "py-5 px-5 text-blue-600 font-bold hover:text-blue-400";

  return (
    <header className="bg-gray-800 shadow-md flex flex-wrap items-center justify-between px-4 sm:px-10 ">
      <h1 className="text-6xl sm:text-2xl font-bold mx-auto sm:mx-0 ">MINIBLOG</h1>
      <nav className="py-5 mx-auto sm:mx-0">
        <NavLink to={"/home"}  className={({isActive})=>isActive ?linkClassActive:linkClass}>Home</NavLink>
        <NavLink to={"/about"} className={({isActive})=>isActive ?linkClassActive:linkClass}>About</NavLink>
      </nav>
    </header>
  )
}

export default NavBar