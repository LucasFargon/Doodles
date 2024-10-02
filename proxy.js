import express from 'express';
import cors from 'cors';
import axios from "axios";
const app = express();
const PORT = 4000;

app.use(cors());

app.get("/search", async (req, res) => {
    const { query } = req.query;
    const API_KEY =
    "0bbcb158d90619e07d73a595895bcd845ceb0aea6920a72b8c2ec76c129caece";

    const URL = "https://serpapi.com/search.json";

    try {
        const response = await axios.get(URL, {
            params: {
                q: query,
                engine: "google",
                google_domain: "google.com.br",
                api_key: API_KEY,
                hl: "pt-br",
                gl: "br",
                num: 10,
            },
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar resultados" });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy rodando na porta ${PORT}`);
});