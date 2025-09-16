import { auth } from "../firebase/config"; // já inicializado
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const useAuthentication = () => {

  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(null);

  // #### CRIAR USUÁRIO ####
  const createUser = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const { user } = await createUserWithEmailAndPassword(auth,data.email,data.password);
      await updateProfile(user,{displayName: data.displayName});
      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;
      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha deve conter pelo menos 6 caracteres."
      } else if (error.message.includes("email-already-in-use")) {
        systemErrorMessage = "E-mail já cadastrado."
      } else {
        systemErrorMessage = "Ocorreu um erro. Por favor tente mais tarde."
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  // #### ENTRAR ####
  const sigin = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;
      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado."
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "senha incorreta."
      } else if (error.message.includes("invalid-credential")) {
        systemErrorMessage = "Credênciais inválidas."
      } else {
        systemErrorMessage = "Ocorreu um erro. Por favor tente mais tarde."
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  // #### LOGOUT ####
  const logout = () => {
    signOut(auth);
  };

  return {
    loading,
    error,
    createUser,
    logout,
    sigin
  };
};