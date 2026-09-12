"use server"
export const getProperties = async () => {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties`, {
        cache: 'force-cache',
        next: {
            revalidate: 60 * 60 * 1, //1hour
            tags: ["all-properties"]
        }
    })
    const result = await res.json();
    return result
}