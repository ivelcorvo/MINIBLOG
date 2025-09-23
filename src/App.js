
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
  import { useDarkModeContext } from "./hooks/useDarkModeContext";
  import { useAuth } from "./hooks/useAuth";

// #### FIREBASE ####

// ##### CONTEXT #####

function App() {
  const {darkMode} = useDarkModeContext();

  const {user,loading} = useAuth();

  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div className={` ${(darkMode)?"bg-gray-900 text-gray-200":"bg-gray-100 text-gray-600"} flex flex-col  min-h-screen p-0 m-0 `}>    
      <BrowserRouter>
        <NavBar></NavBar>
        <main className="flex-grow px-3 py-20">
          <div className="max-w-250 mx-auto p-3 md:p-10 text-center">            
            <Routes>
              <Route path="/"              element={<Home/>}></Route>
              <Route path="/about"         element={<About/>}></Route>
              <Route path="/search"        element={<Search/>}></Route>
              <Route path="/post/:id"      element={<Post/>}></Route>
              <Route path="/login"         element={!user ?<Login/>      :<Navigate to="/"/>}></Route>
              <Route path="/register"      element={!user ?<Register/>   :<Navigate to="/"/>}></Route>
              <Route path="/post/create"   element={user  ?<CreatePost/> :<Navigate to="/login"/>}></Route>
              <Route path="/post/edit/:id" element={user  ?<EditPost/>   :<Navigate to="/login"/>}></Route>
              <Route path="/dashboard"     element={user  ?<Dashboard/>  :<Navigate to="/login"/>}></Route>
              <Route path="*"              element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
