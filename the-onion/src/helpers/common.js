export async function search_for_image(imageDescription) {
    console.log(process.env.REACT_APP_UNSPLASH_ACCESS_KEY)
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${imageDescription}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`);
    const data = await response.json();
    return data.results[0].urls.small;
}
// Helper function to parse articles from chunks
export function processArticles(text) {
  const articles = [];
  const newsItems = text.split('###'); // Split into individual news pieces
  for (let i = 0; i < newsItems.length; i++) {
    // title has ** **
    const articleParts = newsItems[i].split('|');
    const title = articleParts[0].replace(/\*\*/g, '');
    const body = articleParts[1];
    const imageDescription = articleParts[2];
    const mainTag = articleParts[3];
    const tags = articleParts[4];
    articles.push({ title, body, imageDescription, mainTag, tags });
  }

  return articles.filter(article => article.title && article.body);
}