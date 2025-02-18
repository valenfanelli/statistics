import { useEffect, useState } from "react";
import { fetchLanguages } from "../api/api.ts";
import Language from "./Language.tsx";
export type Languagetype = {
    id: string;
    name: string;
    popularity: number;
    paradigm: string[];
    first_appeared: number;
    usage: string;
    official_site: string;
    logo: string;
}
export default function List(){
    const [languages, setLanguages] = useState<Languagetype[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(()=> {
        setTimeout(()=>{
            fetchLanguages()
            .then(setLanguages)
            .catch((error)=> setError(error.message))
            .finally(()=> setLoading(false));
        }, 1000)
        
    }, []);
    if(loading) return <p>Loading Languages ...</p>
    if(error) return <p>{error}</p>
    return (
        <div>
            <h1>Languages</h1>
            <ul className="list">
                {languages.map((item)=> (
                    <li key={item.id}>
                        <Language lang={item}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}