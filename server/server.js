import express from 'express'
import concerts from './data/concerts.js'

const app = express()

app.use('/public', express.static('./public'))
app.use('/scripts', express.static('./public/scripts'))

app.get('/api/concerts', (req, res) => {
  res.json(concerts)
})

app.get('/api/concerts/:slug', (req, res) => {
  const concert = concerts.find((c) => c.slug === req.params.slug)
  if (concert) {
    res.json(concert)
  } else {
    res.status(404).json({ error: 'Concert not found' })
  }
})

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' })
})

app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">UnEarthed API</h1>')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})
