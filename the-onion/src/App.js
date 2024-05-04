import './App.css';
import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cheerio from 'cheerio'
function App() {
  const [articles, setArticleData] = useState([]);
  const [response, setResponse] = useState(''); // Not used in this version

  useEffect(() => {
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
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

    const prompt = "Write three short satirical news articles with the following structure: headline: A catchy, attention-grabbing title. body: 2-3 paragraphs of humorous and exaggerated news content, mocking current events, politics, or pop culture. It should be formed like this, ### **{title}** {content} ### **{title}** {content} ### **{title}** {content}";

    model.generateContentStream(prompt).then(async (result) => {
      let currentArticle = '';
      var processedArticles = [];
      for await (const chunk of result.stream) {
        currentArticle += chunk.text();
        processedArticles = processArticles(currentArticle)
        setArticleData(processedArticles)
      }
    });
  }, []);

  // Helper function to parse articles from chunks
  function processArticles(text) {
    const articles = [];
    const newsItems = text.split('###'); // Split into individual news pieces

    //console.log(newsItems)
    for (let i = 0; i < newsItems.length; i++) {
      // title has ** **
      const title = newsItems[i].split('**')[1];
      const body = newsItems[i].split('**')[2];
      articles.push({ title, body });
    }

    return articles;
  }


  return (
    <div>
      <h1>AI Generated Stories</h1>
      {articles.map((article, index) => (
        <article key={index}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </article>
      ))}
    </div>
  );
}

export default App;
