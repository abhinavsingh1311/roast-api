import { Router } from "express";

const router = Router();

const themes = [
    { id: "CODING", description: "Dev/programming roasts", sampleContext: ["name", "language", "mistake"] },
    { id: "GAMING", description: "Gamer performance roasts", sampleContext: ["name", "game", "performance", "rank"] },
    { id: "PRODUCTIVITY", description: "Habit/discipline roasts", sampleContext: ["name", "habit", "streak", "screenTime"] },
    { id: "EDUCATIONAL", description: "Student/learning roasts", sampleContext: ["name", "subject", "score", "mistake"] }
];

router.get('/themes', (req, res) => {
    res.json({ themes });
});

export default router;