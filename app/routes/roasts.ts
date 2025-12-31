import { Router } from "express";
import validateAuthHeader from "../middleware/auth";
import { generateRoast } from "../services/roastGenerator";

const router = Router();

router.post('/roast', validateAuthHeader, async (req, res) => {
    const { theme, heat = 2, length = 200, context } = req.body;
    if (!theme || !context?.name) {
        return res.status(400).json({ message: "theme and context name is needed!" });
    }
    console.log("Apikey at router", req.apiKey!.id);
    const roast = await generateRoast({ theme, heat, length, context, apiKeyId: req.apiKey!.id });
    if (!roast) {
        return res.status(500).json({ message: "Error generating roasts" });
    }
    res.json({ roast, theme, heat });
});

export default router;