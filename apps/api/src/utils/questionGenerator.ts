// utils/questionGenerator.ts

export function generateQuestions(skills: string[]) {
  const questions: string[] = [];

  if (skills.includes("React")) {
    questions.push("What is Virtual DOM?");
    questions.push("Explain React Hooks.");
  }

  if (skills.includes("Node.js")) {
    questions.push("Explain the Node.js event loop.");
    questions.push("What is middleware in Express?");
  }

  if (skills.includes("MongoDB")) {
    questions.push("What is indexing in MongoDB?");
  }

  if (skills.includes("TypeScript")) {
    questions.push("What are Generics in TypeScript?");
  }

  return questions;
}
