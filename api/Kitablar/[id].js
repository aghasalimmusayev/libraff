import { readFileSync } from "fs";
import { join } from "path";

function getDb() {
    const filePath = join(process.cwd(), "api", "data", "db.json");
    return JSON.parse(readFileSync(filePath, "utf-8"));
}

export default function handler(req, res) {
    const token = req.headers["x-app-token"];
    if (token !== process.env.VITE_API_TOKEN) {
        return res.status(403).json({ error: "Forbidden" });
    }

    const { id } = req.query;
    const db = getDb();
    const kitablar = db.Kitablar;
    const kitab = kitablar.find((k) => String(k.id) === String(id));

    if (!kitab) {
        return res.status(404).json({ error: "Tapilmadi" });
    }

    if (req.method === "GET") {
        return res.status(200).json(kitab);
    }

    if (req.method === "PATCH") {
        // Serverless-de file yazilmir, merge edilmis neticeni qaytaririk
        const updated = { ...kitab, ...req.body };
        return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
        return res.status(200).json({ success: true });
    }

    res.status(405).json({ error: "Method Not Allowed" });
}
