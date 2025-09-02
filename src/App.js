
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom"; 

// #### PAGES ####
  import Home from "./pages/Home";
  import About from "./pages/About";

function App() {
  return (
    <div className="bg-gray-900 h-screen p-1 m-0">

      <BrowserRouter>
        <div className="container bg-gray-800 rounded-xl shadow-md mx-auto my-10 p-10 text-center text-white">
          <Routes>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
