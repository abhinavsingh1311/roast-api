import { Router } from "express";
import validateAuthHeader from "../middleware/auth";
import { generateRoast } from "../services/roastGenerator";

const router = Router();

router.post('/roasts', validateAuthHeader, async (req, res) => {
    const { theme, heat = 2, length = 200, context } = req.body;
    if (!theme || !context?.name) {
        res.status(400).json({ message: "theme and context name is needed!" });
    }

    const roast = await generateRoast({ theme, heat, length, context });
    if (!roast) {
        return res.status(500).json({ message: "Error generating roasts" });
    }
    res.json({ roast, theme, heat });
});

export default router;