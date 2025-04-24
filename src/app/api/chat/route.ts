export async function POST(req: Request) {
    try {
        const { messages } = await req.json()

        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_KEY}`,
                'HTTP-Referer': 'https://furia-chatbot.vercel.app',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'mistralai/mistral-7b-instruct',
                messages: [
                    {
                        role: 'system',
                        content: 'Você é um chatbot para fãs da FURIA Esports (CS2). Dados atualizados: Jogadores: KSCERATO, FalleN, arT, chelo, yuurih. Seja breve e divertido!'
                    },
                    ...messages
                ]
            })
        })

        if (!res.ok) throw new Error(`API error: ${res.statusText}`)

        const data = await res.json()
        return Response.json(data.choices[0].message)

    } catch (error) {
        console.log(error);
        return Response.json({
            role: 'assistant',
            content: 'Erro ao acessar a IA. Pergunte algo sobre a FURIA!'
        }, { status: 500 })
    }
}