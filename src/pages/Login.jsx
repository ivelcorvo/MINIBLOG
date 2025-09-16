import { useState,useEffect } from "react";
import { useAuthActions } from "../hooks/useAuthActions";
import { useDarkModeContext } from "../hooks/useDarkModeContext";

const Login = () => {

  const {darkMode} = useDarkModeContext();
  
  const classInput = `${(darkMode)?"bg-gray-700":"bg-gray-200"}  rounded-xl shadow-md w-full mb-4 px-3 py-1`;

  const [showPassword,setShowPassword] = useState(false);
  const [email,setEmail]               = useState("");
  const [password,setPassword]         = useState("");
  const [error,setError]               = useState("");

  const {sigin, loading, error:authError} = useAuthActions();

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
            <div className="relative">
              <input 
                type={`${(showPassword)?"text":"password"}`}
                name="password"
                placeholder="Insira sua senha"
                required
                className={classInput}
                value={password}
                onChange={e=>setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1 hover:cursor-pointer"
                onClick={()=>{setShowPassword(!showPassword)}}
              >
                {(showPassword)?<i className="fa-solid fa-eye-slash"></i>:<i className="fa-solid fa-eye"></i>}
              </button>
            </div>            
          </div>
          <div className="text-end mt-5">
            <button type="submit" className="text-gray-200 bg-gray-600 px-4 py-2 rounded-xl shadow-md hover:bg-gray-700 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>{loading?"Entrando...":"Entrar"}</button>
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