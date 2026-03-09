import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import ConcertsController from '../controllers/concerts.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', ConcertsController.getConcerts)

router.get('/:concertId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/concert.html'))
})

export default router

