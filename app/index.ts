import { env } from "process";
import express, { urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import limiter from "./middleware/rateLimit";
import apiKeyRouter from './routes/apiKeys';
import roastRouter from './routes/roasts';
import themeRouter from './routes/themes';

const PORT = env.PORT || 4000;
const app = express();

app.use(express.json())
    .use(cors())
    .use(helmet())
    .use(limiter)

//get health
app.get('/', (req, res) => {

    res.json(`Roasting is an art, why not make it easier to be availed!`);
})

app.get(`/health`, (req, res) => {
    res.json({ status: "ok", version: "1.0.0" });
})

//get themes 
app.use(`/v1`, themeRouter);
// post api-keys
app.use('/v1', apiKeyRouter);

// post roasts
app.use('/v1', roastRouter);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
