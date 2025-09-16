import { 
    useState,
    // useEffect,
    useReducer 
} from "react";
import { db } from "../firebase/config";
import { collection,addDoc,Timestamp } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
};

const insertReducer = (state,action)=>{
    switch(action.type){
        case "LOADING":
            return{loading:true, error:null};
        case "INSERTED_DOC": 
            return{loading:false, error:null};
        case "ERROR":
            return{loading:false, error:action.payload}
        default:
            return state;
    }
};

export const useInsertDocument = (docColleCtion)=>{
    const [response,dispatch] = useReducer(insertReducer,initialState);

    // MEMORY LEAK
    const [cancelled,setCancelled] = useState(false);
    const checkedCancelBeforeDispatch = (action)=>{
        if(!cancelled){
            dispatch(action);
        }
    }

    const insertDocument = async(document)=>{

        checkedCancelBeforeDispatch({
            type:"LOADING"            
        });

        try {
            const newDocument = {...document, createdAt:Timestamp.now()}
            const insertDocument = await addDoc(
                collection(db,docColleCtion),
                newDocument
            )
            checkedCancelBeforeDispatch({
                type:"INSERTED_DOC",
                payload:insertDocument,
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
    
    return {insertDocument,response}
}; 