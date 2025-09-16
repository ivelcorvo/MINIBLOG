import { Link } from "react-router-dom";

const PostDetail = ({post}) => {
  return (
    <div className="mb-20 flex flex-col justify-center text-left">
        <h1 className="text-2xl mb-5">{post.title}</h1>
        <img src={post.image} alt={post.title} className="rounded-md shadow-md"/>
        <div className="mt-5">
            <div className="flex flex-row items-center">
                <p><span className="text-gray-500">Postado por:</span> {post.createdBy}</p>
                <Link to={`/post/${post.id}`} className="text-gray-200 bg-gray-600 hover:scale-110 shadow-md rounded-xl px-17 py-1 ml-3">Ler</Link>                
            </div>
            <div>
                {post.tagsArray.map((tag,i)=>(
                    <span key={`${tag}-${i}`} className="text-gray-600"> #{tag}</span>
                ))}
            </div>
        </div>
    </div>
  )
}

export default PostDetail