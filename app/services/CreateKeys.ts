import { prisma } from "../utils/prismaClient";
import { AppType } from "../generated/prisma/client";
import crypto from 'crypto';

interface CreateKeyInput {
    name: string,
    email: string,
    appType?: AppType;
}

function generateApiKey(): string {
    return `roast_${crypto.randomBytes(24).toString("hex")}`;
}

async function createApiKey(data: CreateKeyInput) {
    try {
        const key = generateApiKey();
        const newRecord = await prisma.apiKey.create({
            data: {
                key,
                name: data.name,
                email: data.email,
                appType: data.appType,
            }
        });
        return newRecord;
    }
    catch (ex) {
        console.log('error creating new record:', ex);
    }
}

export default createApiKey;