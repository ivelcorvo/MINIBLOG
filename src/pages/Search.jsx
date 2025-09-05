import { useFetchDodcuments } from '../hooks/useFetchDocuments';
import { useQuery } from '../hooks/useQuery';

const Search = () => {

  const query  = useQuery();
  const search = query.get("q"); // esse get é de URLSearchParams (utilizei no customhook)


  return (
    <div>
        <h2>Search teste</h2>
        <p>{search}</p>
    </div>
  )
}

export default Search