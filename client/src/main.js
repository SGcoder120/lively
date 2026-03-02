import '@picocss/pico/css/pico.min.css';

// simple router and view logic without frameworks
const app = document.getElementById('app');
let allConcerts = [];
let resetFiltersOnHome = false;
const filters = {
  genre: 'all',
  ticketPrice: 'all',
  venueSize: 'all',
};

async function fetchConcerts() {
  const res = await fetch('/api/concerts');
  if (!res.ok) throw new Error('Failed to load concerts');
  return res.json();
}

async function fetchConcert(slug) {
  const res = await fetch(`/api/concerts/${slug}`);
  if (!res.ok) throw new Error('Concert not found');
  return res.json();
}

function getUniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]).filter(Boolean))].sort();
}

function createFilterControl({ id, label, options, value, onChange }) {
  const field = document.createElement('label');
  field.className = 'filter-field';
  field.setAttribute('for', id);
  field.textContent = label;

  const select = document.createElement('select');
  select.id = id;
  select.name = id;

  options.forEach((option) => {
    const element = document.createElement('option');
    element.value = option.value;
    element.textContent = option.label;
    select.appendChild(element);
  });

  select.value = value;
  select.addEventListener('change', (event) => onChange(event.target.value));
  field.appendChild(select);

  return field;
}

function matchTicketPrice(ticketPrice, selectedRange) {
  if (selectedRange === 'all') return true;
  if (selectedRange === 'free') return ticketPrice == null;
  if (ticketPrice == null) return false;
  if (selectedRange === 'under40') return ticketPrice < 40;
  if (selectedRange === '40to60') return ticketPrice >= 40 && ticketPrice <= 60;
  if (selectedRange === 'over60') return ticketPrice > 60;
  return true;
}

function getFilteredConcerts() {
  return allConcerts.filter((concert) => {
    const matchesGenre = filters.genre === 'all' || concert.genre === filters.genre;
    const matchesVenueSize = filters.venueSize === 'all' || concert.venueSize === filters.venueSize;
    const matchesPrice = matchTicketPrice(concert.ticketPrice, filters.ticketPrice);

    return matchesGenre && matchesVenueSize && matchesPrice;
  });
}

function resetFilters() {
  filters.genre = 'all';
  filters.ticketPrice = 'all';
  filters.venueSize = 'all';
}

function renderList(concerts) {
  app.innerHTML = '';

  const filtersSection = document.createElement('article');
  filtersSection.className = 'filters';

  const filtersTitle = document.createElement('h3');
  filtersTitle.textContent = 'Find your next show';

  const controls = document.createElement('div');
  controls.className = 'grid filter-controls';

  controls.appendChild(
    createFilterControl({
      id: 'genre-filter',
      label: 'Genre',
      value: filters.genre,
      options: [
        { value: 'all', label: 'All genres' },
        ...getUniqueValues(allConcerts, 'genre').map((genre) => ({ value: genre, label: genre })),
      ],
      onChange: (value) => {
        filters.genre = value;
        renderList(getFilteredConcerts());
      },
    })
  );

  controls.appendChild(
    createFilterControl({
      id: 'ticket-price-filter',
      label: 'Ticket Price',
      value: filters.ticketPrice,
      options: [
        { value: 'all', label: 'All prices' },
        { value: 'free', label: 'Free only' },
        { value: 'under40', label: 'Under $40' },
        { value: '40to60', label: '$40 - $60' },
        { value: 'over60', label: 'Over $60' },
      ],
      onChange: (value) => {
        filters.ticketPrice = value;
        renderList(getFilteredConcerts());
      },
    })
  );

  controls.appendChild(
    createFilterControl({
      id: 'venue-size-filter',
      label: 'Venue Size',
      value: filters.venueSize,
      options: [
        { value: 'all', label: 'All venue sizes' },
        ...getUniqueValues(allConcerts, 'venueSize').map((venueSize) => ({
          value: venueSize,
          label: venueSize,
        })),
      ],
      onChange: (value) => {
        filters.venueSize = value;
        renderList(getFilteredConcerts());
      },
    })
  );

  const resultsCount = document.createElement('small');
  resultsCount.className = 'results-count';
  resultsCount.textContent = `${concerts.length} concert${concerts.length === 1 ? '' : 's'} found`;

  filtersSection.appendChild(filtersTitle);
  filtersSection.appendChild(controls);
  filtersSection.appendChild(resultsCount);
  app.appendChild(filtersSection);

  if (concerts.length === 0) {
    const emptyState = document.createElement('p');
    emptyState.className = 'empty-state';
    emptyState.textContent = 'No concerts match these filters.';
    app.appendChild(emptyState);
    return;
  }

  const ul = document.createElement('ul');
  ul.className = 'concerts-grid';
  concerts.forEach((c) => {
    const li = document.createElement('li');
    li.className = 'concert-card';

    const card = document.createElement('article');
    const link = document.createElement('a');
    link.textContent = c.eventName;
    link.href = `/concerts/${c.slug}`;
    link.className = 'concert-link';
    card.appendChild(link);

    const metadataDateTime = document.createElement('p');
    metadataDateTime.textContent = `${c.dateTime}`;
    const metadataPlace = document.createElement('p');
    metadataPlace.textContent = `${c.venue}`;
    const metadataPrice = document.createElement('p');
    metadataPrice.textContent = c.ticketPrice == null ? 'Free entry' : `From $${c.ticketPrice.toFixed(2)}`;
    card.appendChild(metadataDateTime);
    card.appendChild(metadataPlace);
    card.appendChild(metadataPrice);

    const tags = document.createElement('div');
    tags.className = 'tags';

    const genre = document.createElement('span');
    genre.className = 'tag tag-genre';
    genre.textContent = c.genre;
    tags.appendChild(genre);

    const venueSize = document.createElement('span');
    venueSize.className = 'tag tag-venue';
    venueSize.textContent = c.venueSize;
    tags.appendChild(venueSize);

    card.appendChild(tags);
    li.appendChild(card);

    ul.appendChild(li);
  });
  app.appendChild(ul);
}

function renderDetail(concert) {
  const container = document.createElement('div');
  container.innerHTML = `
    <article>
      <h2>${concert.eventName}</h2>
      <p><strong>Date/Time:</strong> ${concert.dateTime}</p>
      <p><strong>Venue:</strong> ${concert.venue}, ${concert.city}</p>
      <p><strong>Venue Size:</strong> ${concert.venueSize}</p>
      <p><strong>Genre:</strong> ${concert.genre}</p>
      <p><strong>Artists:</strong> ${concert.artists.join(', ')}</p>
      <p><strong>Price:</strong> ${concert.ticketPrice ? `$${concert.ticketPrice}` : 'Free'}</p>
      <p><a href="/" role="button" class="secondary outline back-link">Back to list</a></p>
    </article>
  `;
  container.className = 'concert-detail';
  app.innerHTML = '';
  app.appendChild(container);
}

function render404() {
  app.innerHTML = '<h2>404 &mdash; Page not found</h2><p>The requested page does not exist.</p><p><a href="/">Back home</a></p>';
}

async function router() {
  const path = window.location.pathname;
  if (path === '/' || path === '/index.html') {
    try {
      const concerts = await fetchConcerts();
      allConcerts = concerts;
      if (resetFiltersOnHome) {
        resetFilters();
        resetFiltersOnHome = false;
      }
      renderList(getFilteredConcerts());
    } catch (err) {
      app.textContent = err.message;
    }
  } else {
    const match = path.match(/^\/concerts\/([^\/]+)$/);
    if (match) {
      const slug = match[1];
      try {
        const concert = await fetchConcert(slug);
        resetFiltersOnHome = true;
        renderDetail(concert);
      } catch (err) {
        render404();
      }
    } else {
      render404();
    }
  }
}

window.addEventListener('popstate', router);
router();
