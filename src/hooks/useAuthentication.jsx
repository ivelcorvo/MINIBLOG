import { db } from "../firebase/config";
import { auth } from "../firebase/config"; // já inicializado

import {    
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";

import { useState,useEffect,useRef } from "react";

export const useAuthentication = ()=>{

    const [error,setError]     = useState(null);
    const [loading,setLoading] = useState(null);

    // OBS: farei aqui um cleanup. com o objetivo de encerrar algo que foi iniciado antes,
    //      para evitar problemas como vazamentos de memória, duplicação de eventos ou comportamentos inesperados.
    // const cancelled = useRef(false);   // flag para evitar updates de estado após unmount
    // const checkedIfIsCancelled = ()=>{
    //     if(cancelled.current){
    //         return true;
    //     }
    //     return false;
    // };  

    // #### CRIAR USUÁRIO ####
    const createUser = async(data)=>{        
        // if(checkedIfIsCancelled()) return; // se o hook já foi desmontado, não faz nada

        setLoading(true);
        setError(null);
        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            console.log("aqui")

            await updateProfile(user,{
                displayName:data.displayName
            });

            setLoading(false);

            // if(!checkedIfIsCancelled()){
            //     setLoading(false);
            // }

            return user;

        } catch (error) {
            // if(!checkedIfIsCancelled()){
            //     console.log(error.message);
            //     console.log(typeof error.message);
            //     setError(error.message)
            //     setLoading(false);
            // }

            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage;
            if(error.message.includes("Password")){
                systemErrorMessage = "A senha deve conter pelo menos 6 caracteres."
            }else if(error.message.includes("email-already-in-use")){
                systemErrorMessage = "E-mail já cadastrado."
            }else{
                systemErrorMessage = "Ocorreu um erro. Por favor tente mais tarde."
            }
            setError(systemErrorMessage);
            setLoading(false);
        }
    };

    // useEffect(()=>{
    //     console.log("Hook montado, cancelled.current =", cancelled.current);
    //     return ()=>{
    //         cancelled.current=true;
    //     }
    // },[]);

    return {
        auth,
        createUser,
        loading,
        error
    };
};