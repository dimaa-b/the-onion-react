import { useEffect, useState } from "react";

export default function ArticleView({ selectedArticle }) {
    // track how much time a user spends on a certain article
    const [startTime, setStartTime] = useState(Date.now());

    useEffect(() => {
        return () => {
            const endTime = Date.now();
            const timeSpent = endTime - startTime;
            console.log(`User spent ${timeSpent}ms on this article`);
        }
    }, []);

    return (
        <div>
            <h1>{selectedArticle.title}</h1>
            <p>{selectedArticle.body}</p>
        </div>
    );
}