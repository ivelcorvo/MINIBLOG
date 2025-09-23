import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import { useDeleteDocument } from "../hooks/useDeleteDocument";
// import { useState } from "react";

const Dashboard = () => {

  const {user} = useAuth();
  const uid = user.uid;
  // console.log("user",user);
  // console.log("uid",uid);

  const {documents:posts, loading, error} = useFetchDocuments("posts",null,uid);
  // console.log(posts);

  const {deleteDocument} = useDeleteDocument("posts");

  return (
    <div>
      <header>
        <h1 className='text-2xl font-bold'>Painel</h1>
        <p>Gerencie os seus posts</p>
      </header>
      <section className="max-w-150 mx-auto flex flex-col justify-center my-10">
        {loading && <p>Carregando. . .</p>}
        {(!loading&&posts&&posts.length===0) ?(
          <div>
            <p className="mb-5">Não foram encontrados posts</p>
            <Link to={"/post/create"} className="text-gray-200 bg-blue-600 hover:bg-blue-700 shadow-md rounded-3xl px-4 py-1">Criar primeiro post</Link>
          </div>
        ) :(
          (!loading&&posts) && posts.map((post)=>(
            <article key={post.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2 text-start">
                <div className="col-span-1">
                  <p className="text-2xl ">{post.title}</p>
                </div>
                <div className="col-span-1 text-center flex flex-col sm:flex-row justify-center sm:justify-end">
                  <Link 
                    className="text-gray-200 bg-blue-600 hover:bg-blue-700 shadow-md rounded-3xl px-4 py-1 m-2"
                    to={`/post/${post.id}`}
                  >
                    Ver
                  </Link>
                  <Link 
                    className="text-gray-200 bg-blue-600 hover:bg-blue-700 shadow-md rounded-3xl px-4 py-1 m-2"
                    to={`/post/edit/${post.id}`}
                  >
                    Editar
                  </Link>
                  <button
                    className="text-gray-200 bg-gray-600 hover:bg-red-900 shadow-md rounded-3xl px-4 py-1 m-2 hover:cursor-pointer"
                    onClick={() => deleteDocument(post.id)}
                  >
                    Deletar
                  </button>
                </div>
              </div>
              <hr className="mb-10"/>
            </article>
          ))
        )}
        {error && <p className="text-red-600">{error}</p>}
      </section>      
    </div>
  )
}

export default Dashboard