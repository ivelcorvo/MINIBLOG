import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import { useDeleteDocument } from "../hooks/useDeleteDocument";
// import { useState } from "react";

const Dashboard = () => {

  const {user} = useAuth();
  const uid = user.uid;

  const {documents:posts, loading, error} = useFetchDocuments("posts",null,uid);
  // console.log(posts);

  const {deleteDocument} = useDeleteDocument("posts");

  // #### COLLAPSE | BTN VER ###
    // const [collapse,setCollapse] = useState(false);
    // const abrir  = "max-h-50";
    // const fechar = "max-h-0";


  return (
    <div>
      <h1 className='text-2xl font-bold'>Dashboard</h1>
      <p>Gerencie os seus posts</p>
      <div className="max-w-150 mx-auto">
        <div className="flex flex-col justify-center my-10">
          {(!loading&&posts&&posts.length===0) ?(
            <div>
              <p className="mb-5">Não foram encontrados posts</p>
              <Link to={"/post/create"} className="bg-gray-600 hover:bg-gray-700 shadow-md rounded-xl px-2 py-1">Criar primeiro post</Link>
            </div>
          ) :(
            (!loading&&posts) && posts.map((post)=>(
              <div key={post.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 text-start">
                  <div className="col-span-1">
                    <h1 className="text-2xl ">{post.title}</h1>
                  </div>
                  <div className="col-span-1 text-end ">
                    {/* <button className="bg-gray-600 hover:scale-110 shadow-md rounded-xl px-3 py-1 m-2 hover:cursor-pointer" onClick={()=>{setCollapse(!collapse)}}>Ver</button>                       */}
                    <Link   className="text-gray-200 bg-gray-600 hover:bg-gray-700 shadow-md rounded-xl px-3 py-1 m-2 inline-block"         to={`/post/${post.id}`} >Ver</Link>
                    <Link   className="text-gray-200 bg-gray-600 hover:bg-gray-700 shadow-md rounded-xl px-3 py-1 m-2 inline-block"         to={`/post/edit/${post.id}`} >Editar</Link>
                    <button className="text-gray-200 bg-gray-600 hover:bg-red-900  shadow-md rounded-xl px-3 py-1 m-2 hover:cursor-pointer" onClick={()=>{deleteDocument(post.id)}} >Deletar</button>
                  </div>
                  {/* <div className={`transition-all duration-500 overflow-hidden overflow-y-scroll ${(collapse)?abrir:fechar} mt-5 pe-5`}>
                    {post.body}
                  </div> */}
                </div>
                <hr className="mb-10"/>
              </div>
            ))
          )}
          {loading && <p>Carregando. . .</p>}
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard