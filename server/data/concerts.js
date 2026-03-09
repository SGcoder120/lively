import { pool } from '../config/database.js'

const concerts = [
  {
    id: 1,
    slug: "electric-dream-festival",
    eventName: "Electric Dream Festival",
    artists: ["The Midnight", "Synthwave Collective"],
    dateTime: "March 15, 2026 @ 20:00",
    venue: "Metro Arena",
    venueSize: "Large",
    city: "New York, NY",
    genre: "Synthwave/Electronic",
    ticketPrice: 45.99
  },
  {
    id: 2,
    slug: "jazz-under-the-stars",
    eventName: "Jazz Under the Stars",
    artists: ["Miles Modern Quartet"],
    dateTime: "March 22, 2026 @ 19:30",
    venue: "Riverside Park Amphitheater",
    venueSize: "Medium",
    city: "Los Angeles, CA",
    genre: "Jazz",
    ticketPrice: 35.00
  },
  {
    id: 3,
    slug: "rock-legends-live",
    eventName: "Rock Legends Live",
    artists: ["The Echoes", "Neon Revival"],
    dateTime: "April 5, 2026 @ 20:30",
    venue: "Downtown Convention Center",
    venueSize: "Large",
    city: "Chicago, IL",
    genre: "Rock",
    ticketPrice: 60.00
  },
  {
    id: 4,
    slug: "hip-hop-culture-night",
    eventName: "Hip-Hop Culture Night",
    artists: ["Urban Flow", "Beat Makers"],
    dateTime: "April 12, 2026 @ 21:00",
    venue: "The Loft",
    venueSize: "Small",
    city: "Atlanta, GA",
    genre: "Hip-Hop",
    ticketPrice: 40.00
  },
  {
    id: 5,
    slug: "indie-summer-vibes",
    eventName: "Indie Summer Vibes",
    artists: ["The Wanderers"],
    dateTime: "May 10, 2026 @ 18:00",
    venue: "Seaside Park",
    venueSize: "Medium",
    city: "Miami, FL",
    genre: "Indie/Alternative",
    ticketPrice: 32.99
  },
  {
    id: 6,
    slug: "classical-masterpieces",
    eventName: "Classical Masterpieces",
    artists: ["City Symphony Orchestra"],
    dateTime: "May 20, 2026 @ 19:00",
    venue: "Concert Hall Royal",
    venueSize: "Large",
    city: "Boston, MA",
    genre: "Classical",
    ticketPrice: 55.00
  },
  {
    id: 7,
    slug: "electronic-music-summit",
    eventName: "Electronic Music Summit",
    artists: ["Neon Pulse", "Digital Dreams", "Cyber Sound"],
    dateTime: "June 1, 2026 @ 22:00",
    venue: "Tech Park Arena",
    venueSize: "Large",
    city: "Seattle, WA",
    genre: "Electronic/EDM",
    ticketPrice: 65.00
  },
  {
    id: 8,
    slug: "blues-night-jam",
    eventName: "Blues Night Jam",
    artists: ["Smoky Blue Band"],
    dateTime: "June 15, 2026 @ 20:00",
    venue: "The Blue Room",
    venueSize: "Small",
    city: "Memphis, TN",
    genre: "Blues",
    ticketPrice: null
  },
  {
    id: 9,
    slug: "country-roads-revival",
    eventName: "Country Roads Revival",
    artists: ["Dustline Riders", "Prairie Sound"],
    dateTime: "June 28, 2026 @ 19:00",
    venue: "Oak Valley Pavilion",
    venueSize: "Medium",
    city: "Nashville, TN",
    genre: "Country",
    ticketPrice: 38.50
  },
  {
    id: 10,
    slug: "latin-night-fiesta",
    eventName: "Latin Night Fiesta",
    artists: ["Ritmo Caliente", "Salsa del Sol"],
    dateTime: "July 3, 2026 @ 20:30",
    venue: "Sunset Cultural Center",
    venueSize: "Medium",
    city: "San Diego, CA",
    genre: "Latin",
    ticketPrice: 42.00
  },
  {
    id: 11,
    slug: "folk-tales-and-tunes",
    eventName: "Folk Tales and Tunes",
    artists: ["Willow & Pine", "The River Poets"],
    dateTime: "July 10, 2026 @ 18:30",
    venue: "Maple Grove Stage",
    venueSize: "Small",
    city: "Portland, OR",
    genre: "Folk",
    ticketPrice: 25.00
  },
  {
    id: 12,
    slug: "reggae-beach-session",
    eventName: "Reggae Beach Session",
    artists: ["Island Frequency", "King Tide Crew"],
    dateTime: "July 18, 2026 @ 17:00",
    venue: "Bayfront Boardwalk",
    venueSize: "Large",
    city: "Tampa, FL",
    genre: "Reggae",
    ticketPrice: 30.00
  },
  {
    id: 13,
    slug: "metal-thunder-night",
    eventName: "Metal Thunder Night",
    artists: ["Iron Circuit", "Crimson Noise"],
    dateTime: "July 25, 2026 @ 21:30",
    venue: "Forge Dome",
    venueSize: "Large",
    city: "Cleveland, OH",
    genre: "Metal",
    ticketPrice: 72.00
  },
  {
    id: 14,
    slug: "soul-city-showcase",
    eventName: "Soul City Showcase",
    artists: ["Velvet Harmony", "June Carter Lane"],
    dateTime: "August 2, 2026 @ 20:00",
    venue: "Harbor Lights Theater",
    venueSize: "Small",
    city: "Baltimore, MD",
    genre: "Soul/R&B",
    ticketPrice: 48.00
  },
  {
    id: 15,
    slug: "pop-stars-live-tour",
    eventName: "Pop Stars Live Tour",
    artists: ["Nova Lane", "Skyline Hearts"],
    dateTime: "August 14, 2026 @ 20:30",
    venue: "Grandview Stadium",
    venueSize: "Large",
    city: "Dallas, TX",
    genre: "Pop",
    ticketPrice: 85.00
  }
];

export default concerts;
