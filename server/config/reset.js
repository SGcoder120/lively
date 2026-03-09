import { pool } from "./database.js"
import "./dotenv.js"
import concerts from "../data/concerts.js"

const createConcertsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS concerts;

        CREATE TABLE concerts (
            id INTEGER PRIMARY KEY,
            slug VARCHAR(255) UNIQUE NOT NULL,
            eventName VARCHAR(255) NOT NULL,
            artists JSONB NOT NULL DEFAULT '[]'::jsonb,
            dateTime VARCHAR(255) NOT NULL,
            venue VARCHAR(255) NOT NULL,
            venueSize VARCHAR(50) NOT NULL,
            city VARCHAR(255) NOT NULL,
            genre VARCHAR(100) NOT NULL,
            ticketPrice NUMERIC(10, 2)
        );
    `
    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 concerts table created successfully')
    } catch (err) {
        console.error('⚠️ error creating concerts table', err)
    }
}

const seedConcertsTable = async () => {
    await createConcertsTable()
    concerts.forEach((concert) => {
        const insertQuery = {
            text: 'INSERT INTO concerts (id, slug, eventName, artists, dateTime, venue, venueSize, city, genre, ticketPrice) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)'
        }
        const values = [
            concert.id,
            concert.slug,
            concert.eventName,
            JSON.stringify(concert.artists),
            concert.dateTime,
            concert.venue,
            concert.venueSize,
            concert.city,
            concert.genre,
            concert.ticketPrice,
        ]
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting concert', err)
                return
            }

            console.log(`✅ ${concert.eventName} added successfully`)
        })
    })
}

seedConcertsTable()