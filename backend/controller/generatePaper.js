import customResponse from "../utilis/customeResponse.js";
import OpenAI from "openai";

export async function generatePaper(req, res) {
  const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });
  console.log(process.env.GROQ_API_KEY);
  const id = req.user.id;

  const { topic, content, difficulty } = req.body;

  if (!topic || !content || !difficulty) {
    return customResponse(
      res,
      400,
      false,
      "Topic, content, and difficulty are required",
      null,
      null,
    );
  }
  try {
    const prompt = `You are an expert question paper generator.

Generate a question paper based on:

Topic: ${topic}
Content: ${content}
Difficulty: ${difficulty}

Generate EXACTLY:

1. 5 MCQs
- Each MCQ must have:
  - question
  - 4 options
  - correctAnswer (must match one option exactly)

2. 3 Short Answer Questions

3. 2 Reasoning Questions

IMPORTANT RULES:
- Questions must be strictly based on the provided content
- Difficulty must match the level given
- No repetition
- Keep language clear and student-friendly

⚠️ VERY IMPORTANT:
Return ONLY valid JSON (no extra text, no explanation)

Format:

{
  "mcqs": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "string"
    }
  ],
  "shortQuestions": ["string", "string", "string"],
  "reasoningQuestions": ["string", "string"]
}
`;
    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: `Topic: ${topic}\nContent: ${content}`,
        },
      ],
    });

    const reply = response.choices[0].message.content;

    // console.log("AI RESPONSE:", reply);

    return customResponse(
      res,
      200,
      true,
      "Question paper generated",
      null,
      {reply,id}
    );
  } catch (err) {
    console.error("Error:", err);
    return customResponse(res, 500, false, "Internal Server Error", err, null);
  }
}
