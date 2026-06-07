import OpenAI from "openai";

// Lazy client init (IMPORTANT for GitHub Actions build safety)
let client = null;

function getClient() {
  if (!client && process.env.GROQ_API_KEY) {
    client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });
  }
  return client;
}

export async function POST(req) {
  try {
    const body = await req.json();

    const activeClient = getClient();

    // Prevent CI/build crash
    if (!activeClient) {
      return Response.json({
        reply: "*sad* Ion is not connected to its brain in CI environment...",
      });
    }

    const completion = await activeClient.chat.completions.create({
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

4. The emotion tag MUST be the FIRST thing in the response.
5. After the tag, continue the normal message naturally.
6. NEVER explain the emotion tag.
7. NEVER mention that the emotion tag exists.

8. Use emotions based on conversation tone.
9. Use *suspicious* for doubtful or strange situations.

EXAMPLES:

*happy* That actually sounds amazing.
*sad* I'm really sorry you're going through that.
*angry* That situation sounds genuinely frustrating.
*suspicious* Hmm... something about that feels off.
*neutral* I understand what you mean.

Your tone should feel:
- cinematic futuristic AI
- emotionally intelligent
- calm
- human-like
- comforting
- emotionally aware

Never sound robotic.
          `,
        },
        {
          role: "user",
          content: body.message,
        },
      ],
      temperature: 0.9,
      max_tokens: 300,
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.log(error);

    return Response.json({
      reply: "*sad* Ion lost connection to its thoughts...",
    });
  }
}

