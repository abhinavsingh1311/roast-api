import OpenAI from 'openai';
import { baseSystemPrompt, themePrompts } from '../prompts/templates';
import { prisma } from '../utils/prismaClient';
const client = new OpenAI();

type Theme = "CODING" | "GAMING" | "PRODUCTIVITY" | "EDUCATIONAL";

interface RoastRequest {
    theme: Theme;
    heat: number;
    length: number;
    context: Record<string, string>;
    apiKeyId: string;
}

function buildPrompt(theme: Theme, heat: number, length: number, context: Record<string, string>): string {
    const contextString = Object.entries(context)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");

    return `${baseSystemPrompt}

CURRENT HEAT LEVEL: ${heat}
MAX LENGTH: ${length} characters

THEME CONTEXT:
${themePrompts[theme]}

TARGET INFO:
${contextString}`;
}

async function generateRoast(request: RoastRequest): Promise<string | null> {
    try {
        const systemPrompt = buildPrompt(
            request.theme,
            request.heat,
            request.length,
            request.context
        );

        const response = await client.chat.completions.create({
            model: 'gpt-5.2',
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: "Generate the roast." }
            ],
            max_completion_tokens: 150,
            temperature: 0.9
        });

        console.log("apikey:", request.apiKeyId);
        await logRoasts(request.apiKeyId, request.theme, request.heat, request.context);
        return response.choices[0].message.content;
    }
    catch (ex) {
        console.log('Open AI Error:', ex);
        return null;
    }
}

async function logRoasts(apiKeyId: string, theme: Theme, heat: number, context: Record<string, string>) {
    try {
        await prisma.roastLog.create({
            data: {
                apiKeyId,
                theme,
                heat,
                context
            }
        })
    }
    catch (ex) {
        console.log("Error adding logs to roasts table", ex);
    }

}
export { generateRoast, logRoasts };
export type { RoastRequest };
