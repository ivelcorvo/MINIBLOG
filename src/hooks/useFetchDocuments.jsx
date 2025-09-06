import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDodcuments = (docCollection, search=null, uid=null)=>{
    const [documents,setDocuments] = useState(null);
    const [error,setError]         = useState(null);
    const [loading,setLoading]     = useState(null);

    // memory leak
    const [cancelled,setCancelled] = useState(null);

    useEffect(()=>{
        const loadData = async()=>{
            if(cancelled) return;

            setLoading(true);

            const collectionRef = await collection(db,docCollection); //vai receber um objeto do tipo CollectionReference, que representa um “ponteiro” para a coleção dentro do banco

            try {
                let q;

                // busca
                // dashboard

                if(search){
                    q = await query(
                        collectionRef, 
                        where("tagsArray", "array-contains", search), 
                        orderBy("createdAt", "desc")
                    );                    
                }else{
                    q = await query(
                        collectionRef, 
                        orderBy("createdAt", "desc")
                    );
                }

                // O onSnapshot do Firebase Firestore é um método usado para ouvir em tempo real as mudanças em um documento ou coleção.
                // Diferente do getDocs() ou getDoc(), que buscam os dados só uma vez,
                // O onSnapshot() fica “escutando” o banco de dados, e toda vez que houver uma alteração, ele atualiza automaticamente no seu app.
                await onSnapshot(q,(querySnapshot)=>{
                    setDocuments(
                        // querySnapshot.docs → lista de documentos que vieram na consulta.
                        querySnapshot.docs.map((doc)=>({ //para cada documento vou criar um objeto
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
                });

                setLoading(false);

            } catch (error) {
                console.log(error);
                setError(error.message);
                setLoading(false);
            }
        };

        loadData();

    },[docCollection, search, uid, cancelled]);

    // useEffect(()=>{
    //     return ()=> setCancelled(true);
    // },[]);

    return {documents, loading, error};
};