import { useState,useEffect } from "react";
import { useAuthentication } from "../hooks/useAuthentication";

const Register = () => {

  const classInput = "bg-gray-700 rounded-xl shadow-md w-full mb-4 px-3 py-1";

  const [displayName,setDisplayName]         = useState("");
  const [email,setEmail]                     = useState("");
  const [password,setPassword]               = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [error,setError]                     = useState("");

  const {createUser, loading, error:authError} = useAuthentication();

  useEffect(()=>{
    if(authError){
      setError(authError);
    }
  },[authError]);

  // #### CRIAR USUÁRIO ####
    const handleSubimit = async(e)=>{
      e.preventDefault();

      setError("");

      const user = {
        displayName,
        email,
        password
      };

      if(password !== confirmPassword){
        setError("As senhas precisam ser iguais!");
        return
      }

      // const res = await createUser(user);
      await createUser(user);

      // console.log(res);
      // console.log(user);

      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-10">Register</h1>
      <form onSubmit={handleSubimit}>
        <div className="max-w-150 mx-auto">
        {/* <div className="w-1/2 mx-auto"> */}
          <div>
            <input 
              type="text"
              name="displayName"
              placeholder="Nome do usuário"
              required
              className={classInput}
              value={displayName}
              onChange={e=>setDisplayName(e.target.value)}
            />
            <input 
              type="email"
              name="email"
              placeholder="E-mail do usuário"
              required
              className={classInput}
              value={email}
              onChange={e=>setEmail(e.target.value)}
            />
            <input 
              type="password"
              name="password"
              placeholder="Insira sua senha"
              required
              className={classInput}
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
            <input 
              type="password"
              name="confirmPassword"
              placeholder="Confirme sua senha"
              required
              className={classInput}
              value={confirmPassword}
              onChange={e=>setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="text-end mt-5">
            <button type="submit" className="bg-gray-600 px-4 py-2 rounded-xl shadow-md hover:bg-gray-700 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>{loading?"Cadastrando...":"Cadastrar"}</button>
          </div>

          {/* #### MENSAGEM ALERTA #### */}
          {error &&
            <p className="text-red-600">{error}</p>
          }
        </div>
      </form>
    </div>
  )
}

export default Register