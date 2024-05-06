import { useEffect, useState } from "react";
import '../index.css';

export default function ArticleView({ selectedArticle, setArticleView }) {
  // Time tracking
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
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
        {selectedArticle.body.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
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