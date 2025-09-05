import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";
import { useInsertDocument } from "../hooks/useInsertDocument";

const CreatePost = () => {

  const classInput = "bg-gray-700 rounded-xl shadow-md w-full mb-4 px-3 py-1";

  const navigate = useNavigate();

  const [title,setTitle]         = useState("");
  const [image,setImage]         = useState("");
  const [body,setBody]           = useState("");
  const [tags,setTags]           = useState([]);
  const [formError,setFormError] = useState("");

  const {insertDocument,response} = useInsertDocument("posts");
  const {user}                    = useAuthValue();
  // console.log(user);

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

    insertDocument(dat);

    navigate("/home");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Criar post</h1>
      <p className="mb-10">Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
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
            <button type="subimit" className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-xl shadow-md hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={response.loading}>
              {response.loading ?"Salvando...":"Salvar"}
            </button>
          </div>
          {response.error && <p className="text-red-600">{response.error}</p>}
          {formError && <p className="text-red-600">{formError}</p>}
        </div>
      </form>
    </div>
  )
}

export default CreatePost