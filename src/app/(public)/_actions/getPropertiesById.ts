"use server"
export const getPropertiesById = async ( id : string) => {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/${id}`, {
        cache: 'force-cache',
        next: {
            revalidate: 60 * 60 * 1, //1hour
            tags: ["property"]
        }
    })
    const result = await res.json();
    return result
}