export async function search_for_image(imageDescription) {
    console.log(process.env.REACT_APP_UNSPLASH_ACCESS_KEY)
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${imageDescription}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`);
    const data = await response.json();
    return data.results[0].urls.small;
}