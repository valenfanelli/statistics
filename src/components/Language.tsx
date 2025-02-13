import { Languagetype } from "./List";
type LanguageProps = {
    lang: Languagetype
}
export default function Language ({lang}: LanguageProps){
    const {name, popularity, paradigm, first_appeared, usage, official_site, logo} = lang;
    return <>
        <div className="language">
            <div className="language-header"> 
                <h2 className="text-xl font-semibold">{name}</h2>
                <img src={logo} alt="imagen" />
            </div>
            <p><strong>Popularity:</strong> {popularity}/100</p>
            <p><strong>Paradigms:</strong> {paradigm.join(", ")}</p>
            <p><strong>First appeared:</strong> {first_appeared}</p>
            <p><strong>Usage:</strong> {usage}</p>
            <a className="text-blue-600 language-button" href={official_site} target="_blank" rel="noopener noreferrer">
                Official Page
            </a>
            
        </div>
    </>
}