import dotenv from "dotenv";
dotenv.config();

// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY!,
// });

// async function listModels() {
//   const models = await ai.models.list();

//   for await (const model of models) {
//     console.log(model.name);
//   }
// }

// listModels();

import { GoogleGenAI } from "@google/genai";

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Hello",
  });

  console.log(response.text);
}

main().catch(console.error);
