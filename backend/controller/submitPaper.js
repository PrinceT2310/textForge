import customResponse from "../utilis/customeResponse.js";
import OpenAI from "openai";

export async function submitPaper(req, res) {
  const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });

  const { questions, userAnswers } = req.body;

  if ( !questions || !userAnswers ) {
    return customResponse(
      res,
      400,
      false,
      "questions or answers are missing",
      null,
      null,
    );
  }
  try {
    const prompt = `
You are an expert evaluator.

Evaluate the given test strictly.

MCQs:
${JSON.stringify(questions.mcqs)}

User MCQ Answers:
${JSON.stringify(userAnswers.mcq)}

Short Questions:
${JSON.stringify(questions.shortQuestions)}

User Answers:
${JSON.stringify(userAnswers.short)}

Reasoning Questions:
${JSON.stringify(questions.reasoningQuestions)}

User Answers:
${JSON.stringify(userAnswers.reasoning)}

----------------------------

INSTRUCTIONS (VERY IMPORTANT):

- Return ONLY valid JSON
- Do NOT write any explanation
- Do NOT include any text before or after JSON
- Do NOT use markdown (no \`\`\`)
- Output must be directly parsable using JSON.parse()

----------------------------

FORMAT:

{
  "score": number (0-10),
  "strengths": "string",
  "weaknesses": "string",
  "whatToStudy": "string"
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
          content: `questions: ${questions}\nanswers: ${userAnswers}`,
        },
      ],
    });

    const reply = response.choices[0].message.content;

    console.log("AI RESPONSE:", reply);

    return customResponse(
      res,
      200,
      true,
      "Result generated",
      null,
      reply,
    );
  } catch (err) {
    console.error("Error:", err);
    return customResponse(res, 500, false, "Internal Server Error", err, null);
  }
}
