"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { currentUser } from "@clerk/nextjs/server";

const CATEGORY_PROMPTS = {
  FRONTEND: "React, JavaScript, CSS, performance, accessibility, browser APIs",
  BACKEND:
    "Node.js, REST APIs, databases, authentication, caching, scalability",
  FULLSTACK:
    "full-stack architecture, API design, state management, deployment",
  DSA: "data structures, algorithms, time complexity, problem solving",
  SYSTEM_DESIGN:
    "distributed systems, scalability, databases, microservices, caching",
  BEHAVIORAL:
    "leadership, teamwork, conflict resolution, career growth, STAR method",
  DEVOPS: "CI/CD, Docker, Kubernetes, cloud infrastructure, monitoring",
  MOBILE:
    "React Native, iOS/Android, performance, offline support, app lifecycle",
};

export const generateInterviewQuestions = async ({ category }) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  if (!category || !CATEGORY_PROMPTS[category])
    throw new Error("Invalid category");

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  const prompt = `
    You are a Senior Software Engineer and an experienced FAANG technical interviewer.

    Your task is to create a realistic mock interview for a candidate preparing for a ${category} interview.

    Focus on these topics:
    ${CATEGORY_PROMPTS[category]}

    Requirements:
    - Generate exactly 6 unique interview questions.
    - Questions should progress from Easy → Medium → Hard.
    - Mix conceptual, practical, and scenario-based questions.
    - Avoid repeated or overly generic questions.
    - Every answer should be technically correct, concise, and interview-ready.
    - Answers should be between 3-6 sentences.
    - Include important points that an interviewer expects.
    - Include one follow-up question for each main question.
    - Include a difficulty level.
    - Include evaluation criteria.

    Return ONLY valid JSON.

    Format:

    [
    {
        "difficulty": "Easy",
        "question": "...",
        "followUp": "...",
        "answer": "...",
        "keyPoints": [
        "...",
        "...",
        "..."
        ],
        "evaluationCriteria": [
        "...",
        "...",
        "..."
        ]
    }
    ]

    Rules:
    - Do NOT wrap the response inside markdown.
    - Do NOT include explanations.
    - Do NOT include text outside JSON.
    - Response must be parseable using JSON.parse().
    `;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  const clean = text.replace(/^```json|^```|```$/gm, "").trim();
  const questions = JSON.parse(clean);

  return { questions };
};