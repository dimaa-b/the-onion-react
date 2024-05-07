import './index.css';
import '@fontsource/inter';
import { useState, useEffect } from 'react';
import { processArticles } from './helpers/common';
import { generateArticles } from './helpers/gemini';
import { StrictMode } from 'react';

import ArticleCard from './components/ArticleCard';
import ArticleView from './components/ArticleView';


function App() {
  const [articles, setArticleData] = useState([]);
  const [openedArticle, setOpenedArticle] = useState(null);
  useEffect(() => {
    setArticleData([]);

    var res = generateArticles();

    res.then(async (result) => {
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

  // displaying the view or the article cards
  var display = null;
  if (openedArticle === null) {
    display = articles.map((article, index) => (<ArticleCard index={index} articleData={article} setViewArticle={onArticleClick}/>))
  } else{
    display = <StrictMode disabled><ArticleView selectedArticle={articles[openedArticle]} setArticleView={onArticleClick} /></StrictMode>
  }

  return (
    <div>
      <div className='flex m-5'>
        {display}
      </div>
    </div>
  );
}

export default App;
