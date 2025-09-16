import { 
    useState,
    // useEffect,
    useReducer 
} from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
};

const deleteReducer = (state,action)=>{
    switch(action.type){
        case "LOADING":
            return{loading:true, error:null};
        case "DELETE_DOC": 
            return{loading:false, error:null};
        case "ERROR":
            return{loading:false, error:action.payload}
        default:
            return state;
    }
};

export const useDeleteDocument = (docColleCtion)=>{
    const [response,dispatch] = useReducer(deleteReducer,initialState);

    // MEMORY LEAK
    const [cancelled,setCancelled] = useState(false);
    const checkedCancelBeforeDispatch = (action)=>{
        if(!cancelled){
            dispatch(action);
        }
    }

    const deleteDocument = async(id)=>{

        checkedCancelBeforeDispatch({
            type:"LOADING"            
        });

        try {
            const deleteDocument = await deleteDoc(doc(db,docColleCtion,id))
            checkedCancelBeforeDispatch({
                type:"DELETE_DOC",
                payload:deleteDocument,
            })
        } catch (error) {
            checkedCancelBeforeDispatch({
                type:"ERROR",
                payload: error.message         
            });
        }
    };

    // useEffect(()=>{        
    //     return ()=>setCancelled(true);
    // },[]);
    
    return {deleteDocument,response}
}; 