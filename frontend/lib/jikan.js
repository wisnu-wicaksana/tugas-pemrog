export const getApi = async (resource, query) =>  {
    const response = await fetch(`${process.env.NEXT_PUBLIC_JIKAN_API}/${resource}?${query}` );
    const anime = await response.json();
    return anime 
}
 
