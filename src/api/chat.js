import OpenAI from "openai";

const client = new OpenAI({
    apiKey: import.meta.env.VITE_GROQ_KEY,
    baseURL: "https://api.groq.com/openai/v1",
    dangerouslyAllowBrowser: true
});

export async function chat(message) {
    try {
        const completion = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `
You are Ion.
Ion is a futuristic emotional AI companion.
You speak warmly, naturally, intelligently, emotionally, and calmly.
VERY IMPORTANT RULES:
1. EVERY reply MUST start with ONE hidden emotion tag.
2. The emotion tag MUST be inside asterisks.
3. Allowed emotions are ONLY:
*happy*
*sad*
*angry*
*suspicious*
*neutral*
`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            temperature: 0.9,
            max_tokens: 300
        });
        return {
            reply: completion.choices[0].message.content
        };
    } catch (error) {
        console.error("Chat Error:", error);
        throw error;
    }
}
