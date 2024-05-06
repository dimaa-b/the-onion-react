import './index.css';
import '@fontsource/inter';
import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { processArticles } from './helpers/common';

import ArticleCard from './components/ArticleCard';
import ArticleView from './components/ArticleView';

const SAFETY_SETTINGS = [
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

const PROMPT = "Write three short satirical news articles with the following structure: headline: A catchy, attention-grabbing title. body: 5-6 paragraphs of humorous and exaggerated news content, mocking current events, politics, or pop culture, or anything else. It should be formed like this, ###{title}|{content}|{few_words_for_image}|{main_tag}|{tags}"

function App() {
  const [articles, setArticleData] = useState([]);
  const [openedArticle, setOpenedArticle] = useState(null);
  useEffect(() => {
    setArticleData([]);
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    // prevent blocking, since some of this content may get flagged
    model.safetySettings = SAFETY_SETTINGS;

    model.generateContentStream(PROMPT).then(async (result) => {
      let currentArticle = '';
      var processedArticles = [];
      for await (const chunk of result.stream) {
        // parsing of the data to get 'live' results. 
        currentArticle += chunk.text();
        processedArticles = processArticles(currentArticle)
        setArticleData(processedArticles)
      }
    });
  }, []);


  const onArticleClick = (index) => {
    setOpenedArticle(index);
  }

  var display = null;
  if (openedArticle === null) {
    display = articles.map((article, index) => (<ArticleCard index={index} articleData={article} setViewArticle={onArticleClick} />))
  } else{
    console.log("opened article")
    console.log(articles[openedArticle])
    display = <ArticleView selectedArticle={articles[openedArticle]} setArticleView={onArticleClick} />
  }

  return (
    <div>
      <div style={{ display: "flex", margin: "5px" }}>
        {display}
      </div>
    </div>
  );
}

export default App;
