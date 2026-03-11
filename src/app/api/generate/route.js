export async function POST(req) {
  try {

    const { topic } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openchat/openchat-7b",
        messages: [
          {
            role: "user",
            content: `Create a lead magnet for topic: ${topic}.
            
Return:
1. Ebook Title
2. 5 Chapters
3. Landing page description`
          }
        ]
      })
    });

    const data = await response.json();

    if (data?.choices?.[0]?.message?.content) {
      return Response.json({
        result: data.choices[0].message.content
      });
    }

    // fallback if AI fails
    const fallback = `
Ebook Title: Ultimate Guide to ${topic}

Chapters:
1. Understanding the Basics of ${topic}
2. Creating a Winning Strategy
3. Tools and Techniques
4. Growth Hacks
5. Monetization Strategies

Landing Page Description:
Learn how to master ${topic} with this step-by-step guide designed for beginners and professionals.
`;

    return Response.json({ result: fallback });

  } catch (error) {

    const fallback = `
Ebook Title: Ultimate Guide

Chapters:
1. Introduction
2. Strategy
3. Tools
4. Growth Hacks
5. Monetization

Landing Page Description:
A simple guide to help you grow your audience and generate leads.
`;

    return Response.json({ result: fallback });

  }
}