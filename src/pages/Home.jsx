// #### HOOKS ####
  import { useNavigate,Link } from "react-router-dom";
  import { useState } from "react";
  import { useFetchDocuments } from "../hooks/useFetchDocuments";
  import { useDarkModeContext } from "../hooks/useDarkModeContext";

// #### COMPONENTS ####
  import PostDetail from "../components/PostDetail";

const Home = () => {

  const {darkMode} = useDarkModeContext();

  const {documents:posts, loading} = useFetchDocuments("posts");

  const [query,setQuery] = useState("");

  const navigate = useNavigate(); 

  // #### PESQUISA ####
    const handleSubimit = (e)=>{
      e.preventDefault();

      if(query){
        return navigate(`/search?q=${query}`);        
      }
    };

  return (
    <div>

      {/* #### PESQUISA #### */}
        <div className="max-w-150 mx-auto">
          <h1 className="text-2xl font-bold">Veja os nossos posts mais recentes</h1>
          <form onSubmit={handleSubimit}>
            <div className="flex flex-row mt-10 mb-20">
              <input 
                type="text" 
                placeholder="Ou busque por tags... "
                className={`${(darkMode)?"bg-gray-700":"bg-gray-200"} shadow-md rounded-s-3xl w-full px-4 py-1`}
                value={query}
                onChange={e=>setQuery(e.target.value)}
              />
              <button className="text-gray-200 bg-blue-600 hover:bg-blue-700 shadow-md rounded-e-3xl px-4 py-1 hover:cursor-pointer">Pesquisar</button>
            </div>
          </form>
        </div>

      {/* #### POSTS #### */}
        <div className="max-w-150 mx-auto flex flex-col justify-center my-10">
          {(!loading&&posts&&posts.length===0) && (
            <div>
              <p className="mb-5">Não foram encontrados posts</p>
              <Link to={"/post/create"} className="bg-gray-600 hover:bg-gray-700 rounded-xl shadow-md px-2 py-1">Criar primeiro post</Link>
            </div>
          )}          
          {(!loading&&posts&&posts.length>0) && 
            posts.map((post,i)=>(
              <PostDetail key={`${post.uid}-${i}`} post={post}></PostDetail>
            ))
          }
          {loading && <p>Carregando. . .</p>}
        </div>

    </div>
  )
}

export default Home