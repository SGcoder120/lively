const express = require('express');
const path = require('path');
const concerts = require('./data/concerts');

const app = express();
const PORT = process.env.PORT || 3000;

// serve static assets from client directory
app.use(express.static(path.join(__dirname, '../client')));

// API routes
app.get('/api/concerts', (req, res) => {
  res.json(concerts);
});

app.get('/api/concerts/:slug', (req, res) => {
  const concert = concerts.find((c) => c.slug === req.params.slug);
  if (concert) {
    res.json(concert);
  } else {
    res.status(404).json({ error: 'Concert not found' });
  }
});

// catch-all for API to return 404
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// serve index.html for known client routes, otherwise send 404 page
// use a generic middleware instead of a path pattern to avoid express 5 regexp issues
app.use((req, res) => {
  // ignore API requests; they are handled above but this ensures any other /api
  // path returns JSON 404 rather than the HTML page.
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }

  // allow root and concert detail paths, otherwise 404 page
  const validClientRoute = /^\/(|concerts\/[^\/]+)$/;
  if (validClientRoute.test(req.path)) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  } else {
    res.status(404).sendFile(path.join(__dirname, '../client/404.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
