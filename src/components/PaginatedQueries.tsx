import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios"
import { useState } from "react";
export type FruitType = {
    id: string,
    name: string,
    quantity: number
}
export default function PaginatedQueries () {
    const [page, setPage] = useState(1);
    const fetchFruits = async (pageId: number): Promise<{ data: FruitType[], pages: number, next: number | null, prev: number | null }> => {
        const response = await axios.get(`http://localhost:4000/fruits?_page=${pageId}&_per_page=4`,
           { headers: { 'Cache-Control': 'no-cache' }}
    );
        return response.data; // ✅ Ahora devuelve el array `FruitType[]` directamente
    };
    
    const {data, isLoading, isError, error} = useQuery<{ data: FruitType[], pages: number, next: number | null, prev: number | null }>({
        queryKey: ["fruits", page],
        queryFn: () => fetchFruits(page),
        placeholderData: keepPreviousData,
        staleTime: 0
    })
    if (isLoading) return <h2>Loading...</h2>;
    if (isError) return <h2>{(error as Error).message}</h2>;
    return (
        <div>
            {data?.data?.map((item: FruitType)=> (
                <div key={item.id}>{item.name}</div>
            ))}
            <button onClick={() => setPage(prev => prev - 1)} disabled={page == 1 ? true : false}>Previous Page</button>
            <button onClick={() => setPage(prev => prev + 1)} disabled={page == 5 ? true : false}>Next Page</button>
        </div>
    )
}