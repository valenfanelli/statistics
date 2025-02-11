import axios from "axios";

export const fetchLanguages = async () => {
    const response = await axios.get("/data/db.json");
    return response.data;
};
