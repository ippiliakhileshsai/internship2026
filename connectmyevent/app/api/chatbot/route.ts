import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  return await handleChat(q);
}

export async function POST(request: Request) {
  try {
    const { messages, message } = await request.json();
    const q = message || (messages && messages[messages.length - 1]?.content) || "";
    return await handleChat(q);
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}

async function handleChat(query: string) {
  if (!query.trim()) {
    return NextResponse.json({ reply: "Please enter a message." });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("GROQ_API_KEY environment variable is not defined");
    return NextResponse.json({
      reply: "The AI assistant is not fully configured yet (missing Groq API key). Please browse our events manually.",
    });
  }

  // Resolve model name
  let model = process.env.model || "qwen-2.5-32b";
  
  // Groq requires specific model names. We map the user's "qwen/qwen3-32b" to Groq's supported "qwen-2.5-32b"
  if (model.includes("qwen") || model.includes("qwen3")) {
    model = "qwen-2.5-32b";
  }

  try {
    // 1. Fetch current events from database to build the chatbot's dynamic context
    const events = await db.event.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        categoryLabel: true,
        date: true,
        location: true,
        price: true,
        priceAmount: true,
        organizer: true,
      },
    });

    const eventsListText = events
      .map(
        (e) =>
          `- [ID: ${e.id}] "${e.title}" (${e.categoryLabel}) - Date: ${e.date}, Location: ${e.location}, Price: ${e.priceAmount || e.price}, Hosted by ${e.organizer}`
      )
      .join("\n");

    // 2. Build system instructions
    const systemInstruction = `You are ConnectAI, the intelligent matching assistant for ConnectMyEvent.
You help participants find hackathons, workshops, and placement campaigns, and help organizers host them.

Here is the complete list of upcoming events in our database:
${eventsListText}

Instructions for responding:
1. Answer the user's question clearly, warmly, and concisely.
2. Recommend relevant events from the database list above when appropriate.
3. ALWAYS link to events using standard HTML tags: <a href="/events/ID" style="color:var(--brand-indigo-600); font-weight:bold; text-decoration:underline;">Event Name &rarr;</a> (replace ID with the event's actual ID).
4. Formatting: Write your response using HTML tags (<br> for lines, <strong>bold</strong>, <em>italic</em>, <ul>/<li> for lists). DO NOT use markdown syntax (like **bold** or *italic* or # header) because the chatbot UI renders HTML directly!
5. If the user asks how to join or register: explain that they should open the event page and click the "Register Now" button on the sidebar.
6. If the user asks how to host: explain they should sign up as an Organizer, go to their Organizer dashboard, and click the "Create Event" button.`;

    // 3. Request completion from Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: query },
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API response error:", errText);
      throw new Error(`Groq API returned status ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || "I couldn't process that request. How else can I help?";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chatbot API dynamic handler error:", error);
    return NextResponse.json({
      reply: "I ran into an issue connecting to the AI brain. You can browse all events manually by clicking <a href='/events' style='color:var(--brand-indigo-600); font-weight:bold;'>Browse Events &rarr;</a>.",
    });
  }
}
