import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function getDb() {
    const filePath = join(__dirname, "data", "db.json");
    return JSON.parse(readFileSync(filePath, "utf-8"));
}

export default function handler(req, res) {
    const token = req.headers["x-app-token"];
    if (token !== process.env.VITE_API_TOKEN) {
        return res.status(403).json({ error: "Forbidden" });
    }

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const db = getDb();
    return res.status(200).json(db.Slider);
}
