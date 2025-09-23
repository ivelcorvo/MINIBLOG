// #### HOOKS ####
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../hooks/useFetchDocument";
// #### COMPONENTS ####

const Post = () => {

  const { id } = useParams();

  const { document: post, loading } = useFetchDocument("posts", id);

  console.log(post);

  return (
    <article className="max-w-150 mx-auto flex flex-col justify-center my-10">
      {(!loading && post && post.length === 0) && (
        <div>
          <p className="mb-5">Post não encontrado</p>
        </div>
      )}
      {(!loading && post) &&
        <div className="text-start">
          <header>
            <h1 className="text-2xl mb-5">{post.title}</h1>
          </header>
          <img src={post.image} alt={post.title} className="rounded-md shadow-md" />
          <div className="mt-5">
            <p><span className="text-gray-500">Postado por:</span> {post.createdBy}</p>
            <p>
              {post.tagsArray.map((tag, i) => (
                <span key={`${tag}-${i}`} className="text-gray-400">#{tag} </span>
              ))}
            </p>
            <p>{post.body}</p>
          </div>
        </div>
      }
      {loading && <p>Carregando. . .</p>}
    </article>
  )
}

export default Post