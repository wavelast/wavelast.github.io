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
//   links        [{ label, href }] links on the cover, opened in a new tab
//   color        optional spine color (hex); otherwise picked from a palette
//   ink          optional title and decoration color (hex); otherwise picked to suit the spine
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
    ink: '#f5c400', // the app's yellow accent
  },
  {
    title: 'Simple Limbus',
    year: 2026,
    description:
      'Simplified guides for every playable identity in Limbus Company. Each one gets a quick tl;dr on how to play it, a short description for every skill and passive, and teammates that suit it, refreshed every week from the wiki.',
    tags: ['React', 'TypeScript', 'Vite', 'GitHub Actions'],
    links: [
      { label: 'Visit site', href: 'https://wavelast.github.io/simple-limbus/' },
      { label: 'Code', href: 'https://github.com/wavelast/simple-limbus' },
    ],
    color: '#6e1216',
    ink: '#f4b800',
  },
]
