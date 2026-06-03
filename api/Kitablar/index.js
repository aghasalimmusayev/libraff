import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function getDb() {
    const filePath = join(__dirname, "..", "data", "db.json");
    return JSON.parse(readFileSync(filePath, "utf-8"));
}

export default function handler(req, res) {
    const token = req.headers["x-app-token"];
    if (token !== process.env.VITE_API_TOKEN) {
        return res.status(403).json({ error: "Forbidden" });
    }

    const db = getDb();
    const kitablar = db.Kitablar;

    if (req.method === "GET") {
        const { CategoryName, Dil, search } = req.query || {};

        let result = kitablar;

        if (CategoryName) {
            result = result.filter((k) => k.CategoryName === CategoryName);
        }
        if (Dil) {
            result = result.filter((k) => k.Dil === Dil);
        }
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(
                (k) =>
                    k.Title?.toLowerCase().includes(q) ||
                    k["Müəllif"]?.toLowerCase().includes(q)
            );
        }

        return res.status(200).json(result);
    }

    if (req.method === "POST") {
        // Serverless-de file yazilmir, amma UI pozulmasin diye ugurlu cavab
        const newBook = req.body;
        return res.status(201).json(newBook);
    }

    res.status(405).json({ error: "Method Not Allowed" });
}
