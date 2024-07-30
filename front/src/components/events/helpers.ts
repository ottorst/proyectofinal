//Vendors
import axios from "axios";

const fetchEvents = async () => {
try {
    const response = await axios.get("http://localhost:3001/events/seeder");
    return response.data;


} catch (error) {
    console.error("Error fetching events",error)
    throw error;
};
};

export default fetchEvents;