import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Languagetype } from "./List"; // Asegúrate de importar el tipo correcto

const fetchLanguageDetails = async (postId: string | undefined): Promise<Languagetype | null> => {
    if (!postId) return null;

    const response = await axios.get("/data/db.json"); // ✅ Obtener todos los lenguajes
    return response.data.find((lang: Languagetype) => lang.id.toLowerCase() === postId.toLowerCase()) || null;
};

export default function Detail() {
    const { postId } = useParams();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["languages", postId],
        queryFn: () => fetchLanguageDetails(postId),
        enabled: !!postId, // ✅ Evita ejecutar la consulta si postId es `undefined`
    });

    if (isLoading) return <h2>Loading...</h2>;
    if (isError) return <h2>{(error as Error).message}</h2>;
    if (!data) return <h2>Language not found</h2>; // ✅ Evita errores si el lenguaje no existe

    const { name, logo, popularity, paradigm = [], first_appeared, usage, official_site } = data;

    return (
        <div className="language">
            <div className="language-header">
                <h2 className="text-xl font-semibold">{name}</h2>
                <img src={logo} alt="imagen" />
            </div>
            <p><strong>Popularity:</strong> {popularity}/100</p>
            <p><strong>Paradigms:</strong> {paradigm.length > 0 ? paradigm.join(", ") : "No paradigms available"}</p>
            <p><strong>First appeared:</strong> {first_appeared}</p>
            <p><strong>Usage:</strong> {usage}</p>
            <a className="text-blue-600 language-button" href={official_site} target="_blank" rel="noopener noreferrer">
                Official Page
            </a>
        </div>
    );
}
