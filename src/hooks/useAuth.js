import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export const useAuth = ()=>{
    const [user,setUser]       = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        // a função onAuthStateChanged do Firebase Authentication é um observador (listener) que fica "escutando" se o estado de autenticação do usuário mudou.
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        });

        return ()=> unsubscribe(); 
    },[]);

    return{loading,user};
};