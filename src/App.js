
import { 
  BrowserRouter,
  Routes,
  Route,
  Navigate 
} from "react-router-dom"; 

// #### PAGES ####
  import Home from "./pages/Home";
  import About from "./pages/About";
  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import CreatePost from "./pages/CreatePost";
  import EditPost from "./pages/EditPost";
  import Dashboard from "./pages/Dashboard";
  import Search from "./pages/Search";
  import Post from "./pages/Post";

// #### COMPONENTS ####
  import NavBar from "./components/NavBar";
  import Footer from "./components/Footer";

// #### HOOKS ####
  import { useState,useEffect } from "react";
  import { useDarkModeContext } from "./hooks/useDarkModeContext";

// #### FIREBASE ####
  import { onAuthStateChanged } from "firebase/auth";
  import { auth } from "./firebase/config"; 

// ##### CONTEXT #####
  import { AuthContextProvider } from './context/AuthContext';

function App() {
  const {darkMode} = useDarkModeContext();

  const [user,setUser] = useState(undefined);

  const loadingUser = user === undefined;

  useEffect(()=>{
    // a função onAuthStateChanged do Firebase Authentication é um observador (listener) que fica "escutando" se o estado de autenticação do usuário mudou.
    onAuthStateChanged(auth,(user)=>{
      setUser(user);      
    });
  },[]);

  if(loadingUser){
    return <p>Carregando...</p>
  }


  return (
    <div className={` ${(darkMode)?"bg-gray-900 text-gray-200":"bg-gray-100 text-gray-600"} flex flex-col  min-h-screen p-0 m-0 `}>    
      <AuthContextProvider value={{user}}>
        <BrowserRouter>
          <NavBar></NavBar>
          <main className="flex-grow px-3 py-20">
            {/* <div className="max-w-250 bg-gray-800 rounded-xl shadow-md mx-auto p-3 md:p-10 text-center"> */}
            <div className="max-w-250 mx-auto p-3 md:p-10 text-center">            
              <Routes>
                <Route path="/"              element={<Home/>}></Route>
                <Route path="/about"         element={<About/>}></Route>
                <Route path="/search"        element={<Search/>}></Route>
                <Route path="/post/:id"      element={<Post/>}></Route>
                <Route path="/login"         element={!user ?<Login/>      :<Navigate to="/home"/>}></Route>
                <Route path="/register"      element={!user ?<Register/>   :<Navigate to="/home"/>}></Route>
                <Route path="/post/create"   element={user  ?<CreatePost/> :<Navigate to="/login"/>}></Route>
                <Route path="/post/edit/:id" element={user  ?<EditPost/>   :<Navigate to="/login"/>}></Route>
                <Route path="/dashboard"     element={user  ?<Dashboard/>  :<Navigate to="/login"/>}></Route>
                <Route path="*"              element={<Navigate to="/" />} />
              </Routes>
            </div>
          </main>
          <Footer></Footer>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
