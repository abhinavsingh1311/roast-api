import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 30 * 60 * 1000, //30 minutes
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,

    handler: (req: Request, res: Response) => {
        res.status(429).json({
            success: false,
            message: "Too many requests, try again later after 30 minutes",
            errorCode: 'RATE_LIMIT_EXCEEDED'
        });
    }

});

export default limiter;