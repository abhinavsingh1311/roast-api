import { env } from "process";
import express, { urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

const PORT = env.PORT || 4000;
const app = express();

app.use(express.json())
    .use(cors())
    .use(helmet())
    .use(bodyParser.urlencoded({
        extended: true
    }));

//get health
app.get('/', (req, res, next) => {

    res.json(`Roasting is an art, why not make it easier to be availed!`);
    next();
})



app.get(`/health`, (req, res) => {
    res.json({ status: "ok", version: "1.0.0" });
})

//get themes 

app.get(`/v1/themes`, (req, res, next) => {
    res.json(`Themes are as follows:`);
    next();
})

// post api-keys

app.post(`/v1/api-keys`, (req, res) => {
    res.json(`API_KEYS here`);
})


// post roasts

app.post(`/v1/roast`, (req, res, next) => {
    res.json(`You will see roast here!`);
    next();
})

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
