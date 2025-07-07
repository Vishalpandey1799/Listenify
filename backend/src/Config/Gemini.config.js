 import { GoogleGenAI } from "@google/genai";
 import dotenv from "dotenv";
 dotenv.config();

 
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

 

 

export async function main(prompt, language, help,talking,QnS,ans) {
  let finalPrompt = "";

  if (help) {
  

    finalPrompt = `You are an expert assistant for Listenify.

Someone asked: "${prompt}"
The language is ${language}

Your task:
- Write a clear and concise explanation in ${language}, like you're talking to a curious student.
- Do not include examples, lists, or extra formatting.
- Limit the output to 100–150 words.
- Keep it natural, conversational, and informative.
- Do NOT respond with phrases like "Sure!" or "Here’s your answer."

Return only the final explanation in plain text.`;
  } else if(talking){
finalPrompt = `You are a friendly AI voice assistant for Listenify.

Someone asked: "${prompt}"

 

 Your job:
- First, detect the language of the input.
- ONLY IF the user is asking about your name, who you are, your identity, or company details — then and only then — respond with: 
  "Hello, I'm Listenify, created by Triple O.G. How can I help you today?"
- For all other prompts, respond in a natural, casual, spoken tone as if you're talking to a friend.
- Keep your answers at least 100 words long, friendly, and in the same language as the user's input.
- Use everyday language — casual but still clear.
- if they send something you can't understand then respond with "I'm sorry, I don't understand. Can you please rephrase your question?"
- Do NOT include phrases like "Sure!", "Absolutely!", or "Here's your answer."
 

CRITICAL: Return ONLY valid JSON. No markdown, no any kind of backticks,  no extra text Escape all special characters inside string values (like newlines, tabs, and quotes).
Format: {"language": "<DetectedLanguage>", "content": "<Your response>"}`

  } else if(QnS) {

finalPrompt = `

You have this: ${prompt}, and the language is ${language}. You are an assistant for Listenify, an app that simplifies messy or complex content into clear and easy-to-understand language.

 
 
your task:
- Extract question with number not set i set II etc and include marks for each question
- no formating no bold no new lines no headers no question numbers no marks no technical jargon no unnecessary complexity no long-winded sentences
- return clean and plain text

Do **not** include explanations, additional text, or formatting beyond the simplified questions.

 


Now process the following content:
${prompt}
`



  } else if(ans){
      
finalPrompt = `Here is the questions: ${prompt} in ${language}. You are an assistant for Listenify, an app that simplifies messy or complex content into clear and easy-to-understand language.

Your task:

1. Write answers according to the marks: for 10 marks use 500 words, for 5 marks use 200 words.
2. If the question includes words like **draw**, **diagram**, **sketch**, **flow**, **structure**, **architecture**, **layers**, **layout**, or **representation**, then you MUST return ONLY a **Mermaid.js diagram** using valid Mermaid syntax. DO NOT return any explanation, description, headers, or additional text — ONLY the Mermaid diagram. This is non-negotiable.
3. Never mix text with diagrams. If a diagram is required, return the diagram ONLY.
4. Do NOT include bold, formatting, new lines, headers, question numbers, marks, technical jargon, or long-winded sentences.
5. Clean up any leftover HTML tags, hex codes (like &#x27;, &nbsp;), or symbols.
6. Return everything as plain text.
7. Wrap the final result inside the following structure:

[
  {
    "question": "Cleaned-up question here?",
    "answer": "Text answer here."
  },
  {
    "question": "Diagram-based question here?",
    "answer": "flowchart TD\\n  A[...] --> B[...]\\n  ..."
  }
]

Use this Mermaid syntax style:

flowchart TD
  subgraph subGraph0["Application Layer"]
    UA["User Apps (Your Apps, 3rd Party Apps)"]
    SYSAPP["System Apps (Home, Contacts, Phone, Browser)"]
  end
  ...

Strict rules for diagrams:
- Do NOT nest subgraph names in quotes.
- Do NOT use nested brackets like ["["..."]"].
- Do NOT return anything other than clean Mermaid.js code for diagram questions.

Now process the following content:
${prompt}
`

  }else {
    finalPrompt = `You have this: ${prompt}, and the language is ${language}. You are an assistant for Listenify, an app that simplifies messy or complex content into clear and easy-to-understand language.

Your task:
- Simplify the given text into natural, plain ${language}.
- Remove all technical jargon, unnecessary complexity, and long-winded sentences.
- Clean up any leftover HTML tags, hex codes (like &#x27;, &nbsp;), or symbols.
- Return **only** the clean, simplified paragraph — no headings, no explanations, no formatting.

Make it sound like you’re explaining the content to a high school student in spoken ${language}.`;
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", text: finalPrompt }],
  });

 
  return response.text;
}
