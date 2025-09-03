import { useState,useEffect } from "react";
import { useAuthentication } from "../hooks/useAuthentication";

const Login = () => {

  const classInput = "bg-gray-700 rounded-xl shadow-md w-full mb-4 px-3 py-1";

  const [email,setEmail]       = useState("");
  const [password,setPassword] = useState("");
  const [error,setError]       = useState("");

  const {sigin, loading, error:authError} = useAuthentication();

  useEffect(()=>{
    if(authError){
      setError(authError);
    }
  },[authError]);

  // #### ENTRAR ####
    const handleSubimit = async(e)=>{
      e.preventDefault();

      setError("");

      const user = {
        email,
        password
      };

      // const res = await sigin(user);
      await sigin(user);

      // console.log(res);
      // console.log(user);
      
      setEmail("");
      setPassword("");
    };

  return (
    <div>
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="mb-10">Faça o login para utilizar o sistema</p>
      <form onSubmit={handleSubimit}>
        <div className="max-w-150 mx-auto">
        {/* <div className="w-1/2 mx-auto"> */}
          <div>
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
          </div>
          <div className="text-end mt-5">
            <button type="submit" className="bg-gray-600 px-4 py-2 rounded-xl shadow-md hover:bg-gray-700 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>{loading?"Entrando...":"Entrar"}</button>
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

export default Login