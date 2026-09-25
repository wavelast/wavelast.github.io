// Everything shown on the site lives here.
// Each project becomes a book on the shelf. Remove them all for an empty bookshelf.

export const site = {
  name: 'wavelast',
}

// Fields:
//   title        spine + cover title (required)
//   year         shown on the cover
//   description  a few sentences for the cover
//   tags         short list of tools/topics
//   links        [{ label, href }] buttons on the cover
//   color        optional spine color (hex); otherwise picked from a palette
export const projects = [
  {
    title: 'Spiral Captain',
    year: 2026,
    description:
      'A multi-account launcher for Spiral Knights on Windows. Keep every account in one list, launch each one straight to the right knight, and arrange the game windows with saved layouts.',
    tags: ['Java', 'JavaFX', 'Maven', 'Windows'],
    links: [
      { label: 'Download', href: 'https://github.com/wavelast/spiral-captain/releases/latest' },
      { label: 'Code', href: 'https://github.com/wavelast/spiral-captain' },
    ],
  },
]
