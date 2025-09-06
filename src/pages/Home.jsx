// #### HOOKS ####
  import { useNavigate,Link } from "react-router-dom";
  import { useState } from "react";
  import { useFetchDodcuments } from "../hooks/useFetchDocuments";

// #### COMPONENTS ####
  import PostDetail from "../components/PostDetail";

const Home = () => {

  const {documents:posts, loading} = useFetchDodcuments("posts");

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
        <h1 className="text-2xl font-bold">Veja os nossos posts mais recentes</h1>
        <form onSubmit={handleSubimit}>
          <div className="flex flex-row mt-10 mb-20">
            <input 
              type="text" 
              placeholder="Ou busque por tags... "
              className="bg-gray-700 shadow-md rounded-s-xl w-full px-3 py-2"
              value={query}
              onChange={e=>setQuery(e.target.value)}
            />
            <button className="bg-gray-600 hover:bg-gray-700 shadow-md rounded-e-xl px-4 py-2 hover:cursor-pointer">Pesquisar</button>
          </div>
        </form>

      {/* #### POSTS #### */}
        <div className="max-w-150 mx-auto">
          {/* <div className="mx-auto"> */}
          <div className="flex flex-col justify-center my-10">
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

    </div>
  )
}

export default Home