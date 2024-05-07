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

const ARTICLES_PROMPT = "Write three short satirical newtitles with the following structure: headline: A catchy, attention-grabbing title. It must look like this, ###title|one_word_for_image|main_tag|tags Do not deviate from this form."
/*
    Return content stream for the prompt
*/
const GENERATE_CONTENT_PROMPT = "Write me a satirical story with the following headline: "
export function generateArticles() {
  const result = model.generateContentStream(ARTICLES_PROMPT);
  return result
}

let lastGeneratedTime = 0;

export function generateArticleContent(title) {
  const currentTime = Date.now();
  if (currentTime - lastGeneratedTime < 1000) {
    throw new Error('Cooldown period not over yet');
  }
  lastGeneratedTime = currentTime;
  try {
    const result = model.generateContentStream(GENERATE_CONTENT_PROMPT + title);
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}