import { Link } from "react-router-dom";

const PostDetail = ({ post }) => {
  return (
    <article className="mb-20 flex flex-col justify-center text-left">
      <header>
        <h1 className="text-2xl mb-5">{post.title}</h1>
      </header>
      <section>
        <img src={post.image} alt={post.title} className="rounded-md shadow-md" />
      </section>
      <footer>
        <div className="mt-5">
          <div className="flex flex-row items-center">
            <p><span className="text-gray-500">Postado por:</span> {post.createdBy}</p>
            <Link to={`/post/${post.id}`} className="text-gray-200 bg-blue-600 hover:scale-110 shadow-md rounded-3xl px-10 py-0.5 ml-3">Ler</Link>
          </div>
          <div>
            {post.tagsArray.map((tag, i) => (
              <span key={`${tag}-${i}`} className="text-gray-400"> #{tag}</span>
            ))}
          </div>
        </div>
      </footer>
    </article>
  )
}

export default PostDetail