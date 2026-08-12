export const analyzeWithAI = async (resumeText) => {

    const isCloud = process.env.OLLAMA_MODE === "cloud";

    const url = isCloud
        ? process.env.OLLAMA_CLOUD_URL
        : process.env.OLLAMA_LOCAL_URL;

    const model = isCloud
        ? process.env.OLLAMA_CLOUD_MODEL
        : process.env.OLLAMA_LOCAL_MODEL;

    const headers = {
        "Content-Type": "application/json"
    };

    if (isCloud) {
        headers.Authorization = `Bearer ${process.env.OLLAMA_API_KEY}`;
    }

    const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
            model,
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
5. missingSkills must contain 5-6 points.
   Each point must contain ONLY ONE SKILL.
6. Suggestions must contain 5-6 points.
   Each point must be 3-4 words.
7. Keep every point short and easy to scan.
8. Do not write paragraphs inside arrays.
9. Do not repeat information.
10. Base the analysis on the actual resume.
11. Do not invent experience, skills, projects, or achievements.
12. Missing skills should be relevant to the candidate's career path.
13. Suggestions must be specific and actionable.
14. Nothing can be empty.
15. Return ONLY valid JSON.
Give a goood response and name shouldnot be mentioned in the response .
`
                },
                {
                    role: "user",
                    content: `Analyze this resume:\n\n${resumeText}`
                }
            ],
            stream: false,
            format: "json"
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
            `Ollama request failed: ${response.status} - ${errorText}`
        );
    }

    const data = await response.json();

    return JSON.parse(data.message.content);
};