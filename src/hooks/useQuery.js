import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useQuery = ()=>{
    const {search} = useLocation(); //Pega a query string atual da URL.

    return useMemo(()=>new URLSearchParams(search), [search] );
};

// useMemo
// Garante que o objeto URLSearchParams só seja recriado quando a search mudar.
// Evita recriações desnecessárias em renderizações.

// URLSearchParams
// É um objeto nativo do JavaScript criado para facilitar a manipulação de query strings (a parte da URL depois do ?)