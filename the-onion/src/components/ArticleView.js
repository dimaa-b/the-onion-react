import { useEffect, useState } from "react";
import { generateArticleContent } from "../helpers/gemini";
import '../index.css';

export default function ArticleView({ selectedArticle, setArticleView }) {
  // Time tracking
  const [startTime, setStartTime] = useState(Date.now());
  const [articleContent, setArticleContent] = useState(null);

  useEffect(() => {
    const result = generateArticleContent(selectedArticle.title);
    if (!result) return;
    result.then(async (result) => {
      let currentArticle = '';
      for await (const chunk of result.stream) {
        currentArticle += chunk.text();
        setArticleContent(currentArticle);
      }
    });


    setStartTime(Date.now());
    return () => {
      const endTime = Date.now();
      const timeSpent = endTime - startTime;
      if (timeSpent < 1000) return;
      console.log(`User spent ${timeSpent}ms on this article`);
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{selectedArticle.title}</h1>
      </div>
      <div className="leading-relaxed text-gray-800">
        {articleContent}
      </div>
      <div className="mt-8">
        <button
          onClick={() => setArticleView(null)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
}