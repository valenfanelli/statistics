import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios"
import { FruitType } from "./PaginatedQueries";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const fetchFruits = async ({pageParam}: { pageParam: number }) => {
    const response = await  axios.get(`http://localhost:4000/fruits?_page=${pageParam}&_per_page=5`,
        { headers: { 'Cache-Control': 'no-cache' }});
    return response.data;
}
export default function InfiniteQueries () {
    const {data, isLoading, error, isError, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey: ["fruits"],
        queryFn: fetchFruits,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages)=> {
            if(allPages.length< 5){
                return allPages.length + 1
            } else {
                return undefined
            }
        }
    })
    const { ref, inView } = useInView();
    useEffect(()=>{
        if(inView){
            fetchNextPage();
        }
    },[fetchNextPage, inView]);
    if (isLoading) return <h2>Loading...</h2>;
    if (isError) return <h2>{(error as Error).message}</h2>;
    console.log(data?.pages[0].data)
    return (
        <div>
        {data?.pages?.map((page, index) => (
            <div key={index} className="fruit">
                {page.data.map((fruit: FruitType) => ( 
                    <div key={fruit.id}>{fruit.name}</div>
                ))}
            </div>
        ))}
        <div ref={ref}>{isFetchingNextPage && "...Loading" }</div>
        {/*<button disabled={!hasNextPage} onClick={() => fetchNextPage()}>Load more..</button>*/}
        </div>
    )
}