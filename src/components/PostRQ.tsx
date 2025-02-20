import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FormEvent, useState } from "react";
import { FruitType } from "./PaginatedQueries";
const fetchFruits = async (): Promise<FruitType[]> => {
    const response = await axios.get(`http://localhost:4000/fruits`);
    return response.data; // ✅ Devuelve solo el array de frutas, no el `AxiosResponse`
};
const addFruit = (fruit: FruitType) => {
    return axios.post(`http://localhost:4000/fruits`, fruit);
}
export default function PostRQ (){
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const {data, isLoading, isError, error, isFetching, refetch} = useQuery({
        queryKey: ["fruits"],
        queryFn: fetchFruits,
    })
    const {mutate} = useMutation({
        mutationFn: addFruit
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const quantity = 10
        mutate({id, name, quantity})
        setId("");
        setName("");
    }
    if (isLoading) return <h2>Loading...</h2>;
    if (isError) return <h2>{(error as Error).message}</h2>;
    return (
    <>
        <form onSubmit={handleSubmit}>
            <input 
                onChange={(e)=> setId(e.target.value)}
                placeholder="Enter fruit id"
                value={id}
            />
            <input 
                onChange={(e)=> setName(e.target.value)}
                placeholder="Enter fruit name"
                value={name}
            />
            <button type="submit">Submit</button>
        </form>
        <button onClick={() => refetch()}>Fetch languages</button>
        <div>
                {data?.map((fruit: FruitType) => (
                    <div key={fruit.id}>
                        <div key={fruit.id}>{fruit.name}</div>
                    </div>
                ))}
        </div>
    </>
    )
}