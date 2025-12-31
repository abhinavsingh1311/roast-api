import { Theme } from "../generated/prisma/client";
import { baseSystemPrompt } from "./templates";

export function buildPrompt(theme: Theme, heat: number, length: number, context: Record<string, string>): string {
    const contextString = Object.entries(context)
        .map(([k, v]) => `${k}: ${v}`)
        .join();

    return `${baseSystemPrompt}
    CURRENT HEAT LEVEL: ${heat}
    MAX LENGTH: ${length} characters
    
    THEME CONTEXT: 
    ${contextString}
    
    Generate the roast:`;
}