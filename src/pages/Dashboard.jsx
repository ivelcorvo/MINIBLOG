import { Link } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import { useState } from "react";

const Dashboard = () => {

  const {user} = useAuthValue();
  const uid = user.uid;

  const {documents:posts, loading, error} = useFetchDocuments("posts",null,uid);
  // console.log(posts);


  // #### COLLAPSE | BTN VER ###
    const [collapse,setCollapse] = useState(false);
    const abrir  = "max-h-50";
    const fechar = "max-h-0";


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
            <div>
              {(!loading&&posts) && posts.map((post)=>(
                <div key={post.id} className="mb-20 flex flex-col justify-center text-start">
                  <h1 className="text-2xl mb-5">{post.title}</h1>
                  <img src={post.image} alt={post.title} className="rounded-md shadow-md"/>
                  <div className="mt-5">
                    <div className="flex flex-row items-center">
                      <p><span className="text-gray-500">Postado por:</span> {post.createdBy}</p>
                      <button className="bg-gray-600 hover:scale-110 shadow-md rounded-xl px-17 py-1 ml-3 hover:cursor-pointer" onClick={()=>{setCollapse(!collapse)}}>Ver</button>
                      {/* <Link to={`/post/${post.id}`} className="bg-gray-600 hover:scale-110 shadow-md rounded-xl px-17 py-1 ml-3">Ler</Link>    */}
                    </div>
                    <div>
                      {post.tagsArray.map((tag,i)=>(
                        <span key={`${tag}-${i}`} className="text-gray-600">#{tag} </span>
                      ))}
                    </div>
                    <div className={`transition-all duration-500 overflow-hidden overflow-y-scroll ${(collapse)?abrir:fechar} mt-5 pe-5`}>
                      {post.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard