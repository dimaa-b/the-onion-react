import { useEffect } from "react";

export default async function ArticleView({ title, tags, description }) {
    // track how much time a user spends on a certain article
    const [startTime, setStartTime] = React.useState(Date.now());

    useEffect(() => {
        const endTime = Date.now();
        const timeSpent = endTime - startTime;
        console.log(`Time spent on article: ${timeSpent}ms`);

        return () => {
            console.log('ArticleCard unmounted');
        };
    }, []);

    // The article will be generated on the fly. 
}