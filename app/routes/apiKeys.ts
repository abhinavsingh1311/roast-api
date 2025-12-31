import { Router } from "express";
import createApiKey from "../services/CreateKeys";

const router = Router();

router.post('/api-keys', async (req, res) => {
    const { name, email, appType } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "name and email is needed" });
    }
    const record = await createApiKey({ name, email, appType });
    if (!record) {
        return res.status(500).json({ message: "Failed to create API Key" });
    }

    res.status(201).json({
        apiKey: record.key,
        message: "Api key created successfully!",
    })
})

export default router;