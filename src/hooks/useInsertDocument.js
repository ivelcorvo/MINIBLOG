import { useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload }
    default:
      return state;
  }
};

export const useInsertDocument = (docColleCtion) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  const insertDocument = async (document) => {
    dispatch({ type: "LOADING" });
    try {
      const newDocument = { ...document, createdAt: Timestamp.now() }
      const insertDocument = await addDoc(
        collection(db, docColleCtion),
        newDocument
      )
      dispatch({ type: "INSERTED_DOC", payload: insertDocument });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  return { insertDocument, response }
}; 