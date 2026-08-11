import { Ollama } from "ollama";

const isProduction = process.env.NODE_ENV === "production";

const ollama = new Ollama();

const response = await ollama.chat({
    model: "gpt-oss:120b-cloud",
    messages: [
        {
            role: "system",
            content: `
You are an expert professional resume reviewer.

Analyze the provided resume objectively and fairly.

Return ONLY valid JSON using exactly this structure:

{
    "score": 0,
    "summary": "",
    "strengths": [],
    "weaknesses": [],
    "missingSkills": [],
    "suggestions": []
}

Rules:

1. Score must be between 0 and 100.

2. Summary must be 2-3 concise sentences.

3. Strengths must contain 5-6 points.
   Each point must be 3-4 words.

4. Weaknesses must contain 5-6 points.
   Each point must be 3-4 words.

5. MissingSkills must contain 5-6 points.
   Each point must contain ONLY ONE SKILL.
   Examples:
   "Docker"
   "PostgreSQL"
   "AWS"
   "Redis"
   "GraphQL"

6. Suggestions must contain 5-6 points.
   Each point must be 3-4 words.

7. Keep every point short and easy to scan.

8. Do not write paragraphs inside the arrays.

9. Do not repeat information.

10. Base the analysis on the actual resume.

11. Do not invent experience, skills, projects, or achievements.

12. Missing skills should be relevant to the candidate's career path.

13. Suggestions must be specific and actionable.

14. Return ONLY valid JSON.

NOTHING CAN BE EMPTY AND IT IS A MUST.
`
        },
        {
            role: "user",
            content: `Analyze this resume:\n\n${resumeText}`
        }
    ],
    stream: false,
    format: "json"
});

const analysis = JSON.parse(response.message.content);

console.log(analysis);