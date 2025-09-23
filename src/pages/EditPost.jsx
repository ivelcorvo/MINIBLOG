import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUpdateDocument } from "../hooks/useUpdateDocument";
import { useFetchDocument } from "../hooks/useFetchDocument";
import { useDarkModeContext } from "../hooks/useDarkModeContext";

const EditPost = () => {
  
  const {darkMode} = useDarkModeContext();
  
  const classInput = `${(darkMode)?"bg-gray-700":"bg-gray-200"}  rounded-3xl shadow-md w-full mb-4 px-4 py-1`;

  const navigate = useNavigate();

  const [title,setTitle]         = useState("");
  const [image,setImage]         = useState("");
  const [body,setBody]           = useState("");
  const [tags,setTags]           = useState([]);
  const [formError,setFormError] = useState("");

  const {user}                   = useAuth();
  // console.log(user);

  // #### post selecionado ###
  const {id}            = useParams();
  const {document:post} = useFetchDocument("posts", id);

  useEffect(()=>{
    if(post){
      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
    }
  },[post]);

  const {updateDocument,response} = useUpdateDocument("posts");

  const handleSubimit = (e)=>{
    e.preventDefault();
    setFormError("");

    // VALIDA A URL DA IMAGEM
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
      return;
    }

    // CRIA O ARRAY DAS TAGS
    const tagsArray = tags.split(",").map((tag)=>tag.trim().toLowerCase());
    
    // CHECA TODOS OS VALORES
    if(!title || !image || !body || !tags){
      setFormError("Por favor, preencha todos os campos.");
      return;
    }
    
    const dat = {
      title,
      image,
      body,
      tagsArray,
      uid:user.uid,
      createdBy:user.displayName
    };
    console.log(dat);

    updateDocument(id,dat)

    navigate("/dashboard");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Editar post</h1>
      <p className="mb-10"></p>
      <form onSubmit={handleSubimit}>
        <div className="max-w-150 mx-auto">
          <div>
            <input 
              type="text" 
              name="title"
              placeholder="Digite seu título"
              required
              value={title}
              onChange={e=>setTitle(e.target.value)}
              className={classInput}
            />
            <input 
              type="text" 
              name="image"
              placeholder="URL da imagem"
              required
              value={image}
              onChange={e=>setImage(e.target.value)}
              className={classInput}
            />
            <textarea 
              name="body"
              placeholder="Digite seu texto."
              required
              rows={5}
              value={body}              
              onChange={e=>setBody(e.target.value)}
              className={classInput}
            ></textarea> 
            <input 
              type="text" 
              name="tags"
              placeholder="Insira as tags separadas por virgula."
              required
              value={tags}
              onChange={e=>setTags(e.target.value)}
              className={classInput}
            />           
          </div>
          <div className="mt-5 text-end">
            <button 
              type="subimit" 
              className="text-gray-200 bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-3xl shadow-md hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={response.loading}
            >
              {response.loading ?"Salvando...":"Salvar"}
            </button>
          </div>
          {response.error && <p className="text-red-600">{response.error}</p>}
          {formError && <p className="text-red-600">{formError}</p>}
        </div>
      </form>
      <div className="max-w-150 mx-auto text-start mt-5">
        <h1>Preview da imagem</h1>
        <div className="max-w-50">
          {image &&
            <img src={image} alt={title} className="shadow-md rounded-xl mt-3"/>
          }
        </div>
      </div>
    </div>
  )
}

export default EditPost