import { auth } from "../firebase/config"; // já inicializado
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const useAuthActions = () => {

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
      switch (error.code){
        case "auth/email-already-in-use":
          systemErrorMessage = "Este e-mail já está cadastrado.";
          break;
        case "auth/invalid-email":
          systemErrorMessage = "Formato de e-mail inválido.";
          break;
      case "auth/operation-not-allowed":
        systemErrorMessage = "Cadastro com e-mail/senha desabilitado.";
        break;
      case "auth/weak-password":
        systemErrorMessage = "A senha deve ter pelo menos 6 caracteres.";
        break;
      default:
        systemErrorMessage = "Ocorreu um erro inesperado. Tente novamente.";
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
      switch (error.code) {
        case "auth/user-not-found":
          systemErrorMessage = "Não existe usuário com esse e-mail.";
          break;
        case "auth/wrong-password":
          systemErrorMessage = "Senha incorreta.";
          break;
        case "auth/invalid-email":
          systemErrorMessage = "E-mail em formato inválido.";
          break;
        case "auth/user-disabled":
          systemErrorMessage = "Conta desativada.";
          break;
        case "auth/invalid-credential":
          systemErrorMessage = "Credenciais inválidas. Verifique e-mail e senha.";
          break;
        default:
          systemErrorMessage = "Ocorreu um erro inesperado. Tente novamente.";
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  // #### LOGOUT ####
  const logout = async() => {
    await signOut(auth);
  };

  return {
    loading,
    error,
    createUser,
    logout,
    sigin
  };
};