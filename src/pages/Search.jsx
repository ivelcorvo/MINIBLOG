  import { Link } from 'react-router-dom';
// #### HOOKS ####
  import { useFetchDodcuments } from '../hooks/useFetchDocuments';
  import { useQuery } from '../hooks/useQuery';
// #### COMPONENTS ####
  import PostDetail from '../components/PostDetail';

const Search = () => {

  const query  = useQuery();
  const search = query.get("q"); // esse get é de URLSearchParams (utilizei no customhook useQuery)

  // talvez eu devesse utilizar
  // import { useSearchParams } from "react-router-dom"
  // const [searchParams] = useSearchParams();    
  // assim eu evitaria a driação de um customhook

  const {documents:posts, loading} = useFetchDodcuments("posts", search);

  return (
    <div className='max-w-150 mx-auto'>
      {(!loading&&posts&&posts.length===0) && (
        <div>
          <p className="mb-5">Não foram encontrados posts</p>
          <Link to={"/post/create"} className="bg-gray-600 hover:bg-gray-700 rounded-xl shadow-md px-2 py-1">Criar primeiro post</Link>
        </div>
      )}          
      {(!loading&&posts&&posts.length>0) && 
        posts.map((post,i)=>(
          // <PostDetail key={`${post.uid}-${i}`} post={post}></PostDetail>
          <PostDetail key={post.id} post={post}></PostDetail>
        ))
      }      
      {loading && <p>Carregando. . .</p>}
    </div>
  )
}

export default Search