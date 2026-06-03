import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { join } from 'path'

function getDb() {
    const filePath = join(process.cwd(), 'api', 'data', 'db.json')
    return JSON.parse(readFileSync(filePath, 'utf-8'))
}

function parseBody(req) {
    return new Promise((resolve) => {
        let data = ''
        req.on('data', (chunk) => (data += chunk))
        req.on('end', () => {
            try { resolve(JSON.parse(data)) } catch { resolve({}) }
        })
    })
}

function apiDevMiddleware(token) {
    return {
        name: 'api-dev-middleware',
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                if (!req.url.startsWith('/api/')) return next()

                const incomingToken = req.headers['x-app-token']
                if (incomingToken !== token) {
                    res.writeHead(403, { 'Content-Type': 'application/json' })
                    return res.end(JSON.stringify({ error: 'Forbidden' }))
                }

                const urlObj = new URL(req.url, 'http://localhost')
                const pathname = urlObj.pathname
                const query = Object.fromEntries(urlObj.searchParams)
                const db = getDb()

                res.setHeader('Content-Type', 'application/json')

                // GET /api/Slider
                if (pathname === '/api/Slider' && req.method === 'GET') {
                    res.writeHead(200)
                    return res.end(JSON.stringify(db.Slider))
                }

                // GET /api/users  POST /api/users
                if (pathname === '/api/users') {
                    const users = db.Users || []
                    if (req.method === 'GET') {
                        let result = users
                        if (query.email) result = result.filter(u => u.email === query.email)
                        if (query.parol) result = result.filter(u => u.parol === query.parol)
                        res.writeHead(200)
                        return res.end(JSON.stringify(result))
                    }
                    if (req.method === 'POST') {
                        const body = await parseBody(req)
                        res.writeHead(201)
                        return res.end(JSON.stringify(body))
                    }
                }

                // GET /api/Kitablar  POST /api/Kitablar
                if (pathname === '/api/Kitablar') {
                    const kitablar = db.Kitablar
                    if (req.method === 'GET') {
                        let result = kitablar
                        if (query.CategoryName) result = result.filter(k => k.CategoryName === query.CategoryName)
                        if (query.Dil) result = result.filter(k => k.Dil === query.Dil)
                        if (query.search) {
                            const q = query.search.toLowerCase()
                            result = result.filter(k =>
                                k.Title?.toLowerCase().includes(q) ||
                                k['Müəllif']?.toLowerCase().includes(q)
                            )
                        }
                        res.writeHead(200)
                        return res.end(JSON.stringify(result))
                    }
                    if (req.method === 'POST') {
                        const body = await parseBody(req)
                        res.writeHead(201)
                        return res.end(JSON.stringify(body))
                    }
                }

                // GET /api/Kitablar/:id  PATCH /api/Kitablar/:id  DELETE /api/Kitablar/:id
                const idMatch = pathname.match(/^\/api\/Kitablar\/(.+)$/)
                if (idMatch) {
                    const id = idMatch[1]
                    const kitab = db.Kitablar.find(k => String(k.id) === String(id))
                    if (!kitab) {
                        res.writeHead(404)
                        return res.end(JSON.stringify({ error: 'Tapilmadi' }))
                    }
                    if (req.method === 'GET') {
                        res.writeHead(200)
                        return res.end(JSON.stringify(kitab))
                    }
                    if (req.method === 'PATCH') {
                        const body = await parseBody(req)
                        res.writeHead(200)
                        return res.end(JSON.stringify({ ...kitab, ...body }))
                    }
                    if (req.method === 'DELETE') {
                        res.writeHead(200)
                        return res.end(JSON.stringify({ success: true }))
                    }
                }

                res.writeHead(404)
                res.end(JSON.stringify({ error: 'Not Found' }))
            })
        }
    }
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [react(), apiDevMiddleware(env.VITE_API_TOKEN)],
    }
})
