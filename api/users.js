import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function getDb() {
    const filePath = join(__dirname, "data", "db.json");
    return JSON.parse(readFileSync(filePath, "utf-8"));
}

function parseQuery(url) {
    const queryString = url.includes("?") ? url.split("?")[1] : "";
    const params = {};
    if (!queryString) return params;
    queryString.split("&").forEach((part) => {
        const [key, value] = part.split("=");
        if (key) params[decodeURIComponent(key)] = decodeURIComponent(value || "");
    });
    return params;
}

export default function handler(req, res) {
    const token = req.headers["x-app-token"];
    if (token !== process.env.VITE_API_TOKEN) {
        return res.status(403).json({ error: "Forbidden" });
    }

    const db = getDb();
    const users = db.Users || [];

    if (req.method === "GET") {
        const query = req.query || parseQuery(req.url);
        let result = users;

        if (query.email) {
            result = result.filter((u) => u.email === query.email);
        }
        if (query.parol) {
            result = result.filter((u) => u.parol === query.parol);
        }

        return res.status(200).json(result);
    }

    if (req.method === "POST") {
        // Serverless-de file yazilmir, amma ugurlu cavab qaytaririk
        const newUser = req.body;
        return res.status(201).json(newUser);
    }

    res.status(405).json({ error: "Method Not Allowed" });
}
