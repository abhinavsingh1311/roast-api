import { prisma } from '../utils/prismaClient';
import { Request, Response, NextFunction } from 'express';

async function findApiKey(apiKey: string) {
    try {
        const uniqueKey = await prisma.apiKey.findUnique({
            where: {
                key: apiKey,
            },
        });
        return uniqueKey;
    }
    catch (err) {
        console.log('error with query: ', err);
        return null;
    }
}

const validateAuthHeader = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiKey = req.headers["x-api-key"];
        if (!apiKey || typeof apiKey !== 'string') {
            return res.status(401).json({ message: "API Key Not found" });
        }
        const keyrecord = await findApiKey(apiKey);
        if (keyrecord) {
            req.apiKey = keyrecord;
            next();
        } else {
            return res.status(401).json({ message: 'Invalid API key' });
        }
    }
    catch {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default validateAuthHeader;