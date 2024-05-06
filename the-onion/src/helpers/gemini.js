import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
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
// prevent blocking, since some of this content may get flagged
model.safetySettings = SAFETY_SETTINGS;

const ARTICLES_PROMPT = "Write three short satirical news articles with the following structure: headline: A catchy, attention-grabbing title. body: 5-6 paragraphs of humorous and exaggerated news content, mocking current events, politics, or pop culture, or anything else. It should be formed like this, ###{title}|{content}|{few_words_for_image}|{main_tag}|{tags}"
/*
    Return content stream for the prompt
*/
export function generateArticles() {
    const result = model.generateContentStream(ARTICLES_PROMPT);
    return result
    }