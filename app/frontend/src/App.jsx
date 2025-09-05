import React, { useEffect, useState } from 'react'

export default function App() {
  const [message, setMessage] = useState('...')
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    fetch('/api/hello')
      .then(r => r.json())
      .then(d => setMessage(d?.message ?? JSON.stringify(d)))
      .catch(() => setMessage('Failed to reach backend'))

    fetch('/healthz')
      .then(r => r.json())
      .then(d => setStatus(d.status))
      .catch(() => setStatus('down'))
  }, [])

  return (
    <div style={{display:'grid',placeItems:'center',minHeight:'100vh',padding:'2rem'}}>
      <div style={{
        width:'min(720px,90vw)',
        background:'linear-gradient(180deg,#111827,#0b1020)',
        border:'1px solid #1f2937',
        borderRadius:'20px',
        padding:'28px',
        boxShadow:'0 10px 30px rgba(0,0,0,.4)'
      }}>
        <h1 style={{fontSize:'28px',margin:'0 0 12px'}}>Modern Microservice Demo</h1>
        <p style={{opacity:.8,margin:'0 0 20px'}}>React + FastAPI • Dockerized • Health-checked • Tested</p>

        <div style={{display:'grid',gap:'12px'}}>
          <div style={{padding:'14px',background:'#0b1220',border:'1px solid #1f2937',borderRadius:'12px'}}>
            <strong>Frontend health:</strong> {status}
          </div>
          <div style={{padding:'14px',background:'#0b1220',border:'1px solid #1f2937',borderRadius:'12px'}}>
            <strong>Backend says:</strong> {message}
          </div>
        </div>

        <div style={{marginTop:'18px',opacity:.7,fontSize:'14px'}}>
          Tip: Try <code>curl http://localhost:8000/healthz</code> and <code>curl http://localhost:8080/healthz</code>
        </div>
      </div>
    </div>
  )
}
