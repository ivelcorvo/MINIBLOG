
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom"; 

// #### PAGES ####
  import Home from "./pages/Home";
  import About from "./pages/About";

// #### COMPONENTS ####
  import NavBar from "./components/NavBar";
  import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col bg-gray-900 min-h-screen p-0 m-0 text-white">    

      <BrowserRouter>

        <NavBar></NavBar>

        <main className="flex-grow px-5 py-5 sm:py-15">
          <div className="container bg-gray-800 rounded-xl shadow-md mx-auto p-3 md:p-10 text-center">            
            <Routes>
              <Route path="/home" element={<Home/>}></Route>
              <Route path="/about" element={<About/>}></Route>
            </Routes>
          </div>
        </main>

        <Footer></Footer>

      </BrowserRouter>

    </div>
  );
}

export default App;
