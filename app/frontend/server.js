import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { createProxyMiddleware } from 'http-proxy-middleware'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 8080
const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8000'

// health
app.get('/healthz', (_req, res) => res.json({ status: 'ok' }))

// silence favicon noise
app.get('/favicon.ico', (_req, res) => res.status(204).end())

// proxy api to backend inside the compose network
app.use(
  '/api',
  // re-add the '/api' prefix that Express removes when mounting
  (req, _res, next) => {
    req.url = '/api' + req.url
    next()
  },
  createProxyMiddleware({
    target: BACKEND_URL,
    changeOrigin: true
  })
)

// static
const distDir = path.join(__dirname, 'dist')
app.use(express.static(distDir))
app.get('*', (_req, res) => {
  const indexPath = path.join(distDir, 'index.html')
  // defensive: if empty/missing, return minimal HTML so you don’t see a white page
  try {
    const size = fs.existsSync(indexPath) ? fs.statSync(indexPath).size : 0
    if (size > 0) return res.sendFile(indexPath)
  } catch {}
  res.type('html').send(`<!doctype html><html><head><meta charset="utf-8"><title>Demo Frontend</title></head><body style="margin:0;background:#0f172a;color:#e2e8f0;font-family:Inter,system-ui"><div style="padding:2rem">dist/index.html missing or empty — rebuild the frontend image.</div></body></html>`)
})

app.listen(PORT, () => {
  console.log(`Frontend listening on http://0.0.0.0:${PORT}, proxying API to ${BACKEND_URL}`)
})
