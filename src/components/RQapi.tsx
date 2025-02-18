import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Language from "./Language"
import { Languagetype } from "./List";

const fetchLanguages = async (): Promise<Languagetype[]> => {
    const response = await axios.get("/data/db.json");
    return response.data;
}

export const RQapi = () => {
        
    const {data, isLoading, isError, error, isFetching, refetch} = useQuery<Languagetype[]>({
        queryKey: ["languages"], //every query requires an ID ["languages", language.id] if it is only one
        queryFn: fetchLanguages,
        
        //gcTime: 5000, cache time
        //staleTime: 30000, //time to refresh the request
        //refetchOnMount: true,
        //refetchOnWindowFocus: true,//ejecuta automaticamente cuando vuelve a la ventana
        //refetchInterval: 2000
        //enabled: false
    })
    if(isLoading || isFetching){
        return <h2>isLoading...</h2>
    }
    if(isError){
        return <h2>{error.message}</h2>
    }
    return (
        <>
            <h2>Languages</h2>
            <button onClick={() => refetch()}>Fetch languages</button>
            {data?.map((item: Languagetype)=> (
                <li key={item.name}>
                    <Language lang={item}/>
                </li>
            ))}
        </>
    )
}