import './App.css';
import '@fontsource/inter';
import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as React from 'react';
import ArticleCard from './components/ArticleCard';
function App() {
  const [articles, setArticleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    // prevent blocking, since some of this content may get flagged
    model.safetySettings = [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_NONE'
      },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE'
      }
    ]

    const prompt = "Write three short satirical news articles with the following structure: headline: A catchy, attention-grabbing title. body: 2-3 paragraphs of humorous and exaggerated news content, mocking current events, politics, or pop culture. It should be formed like this, ###{title}|{content}|{few_words_for_image}|{main_tag}|{tags}";

    model.generateContentStream(prompt).then(async (result) => {
      let currentArticle = '';
      var processedArticles = [];
      for await (const chunk of result.stream) {
        currentArticle += chunk.text();
        processedArticles = processArticles(currentArticle)
        setArticleData(processedArticles)
      }
      setLoading(false);
    });
  }, []);

  // Helper function to parse articles from chunks
  function processArticles(text) {
    const articles = [];
    const newsItems = text.split('###'); // Split into individual news pieces

    //console.log(newsItems)
    for (let i = 0; i < newsItems.length; i++) {
      // title has ** **
      const articleParts = newsItems[i].split('|');
      const title = articleParts[0].replace(/\*\*/g, '');
      const body = articleParts[1];
      const imageDescription = articleParts[2];
      const mainTag = articleParts[3];
      const tags = articleParts[4];
      articles.push({ title, body, imageDescription, mainTag, tags});
    }

    return articles.filter(article => article.title && article.body);
  }


  return (
    <div>
      <h1>AI Generated Stories</h1>
      <div className='flex flex-row'>
        {articles.map((article, index) => {
          console.log(article)
          return (
            <ArticleCard key={index} articleData={article} />
          )
        })}
      </div>
    </div>
  );
}

export default App;
