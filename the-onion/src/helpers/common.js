export async function search_for_image(imageDescription) {
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
    const title = articleParts[0].trim();
    const imageDescription = articleParts[1];
    const mainTag = articleParts[2];
    const tags = articleParts[3];
    articles.push({ title, imageDescription, mainTag, tags });
  }

  return articles.filter(article => article.title);
}