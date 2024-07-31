//Vendors

const fetchEvents = async () => {
try {
    const response = await fetch("http://localhost:3001/events/seeder",{
        method:"GET"
    });
    return response.json();


} catch (error) {
    console.error("Error fetching events",error)
    throw error;
};
};

export default fetchEvents;