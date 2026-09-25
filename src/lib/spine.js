// Book-cloth colors with a readable ink for the spine text, in shelf order:
// dark and light alternate so neighbouring books never blend together.
const PALETTE = [
  { color: '#2f5f93', ink: '#f0e2c9' }, // denim
  { color: '#f0e2c9', ink: '#1a2b3b' }, // parchment
  { color: '#25707e', ink: '#f3ead6' }, // teal
  { color: '#a8c8e6', ink: '#13263a' }, // powder blue
  { color: '#1a4f80', ink: '#f0e2c9' }, // navy
  { color: '#d4e3ef', ink: '#1a2b3b' }, // ice
  { color: '#1f6fa8', ink: '#f3ead6' }, // cerulean
  { color: '#f6efe0', ink: '#1a2b3b' }, // ivory
  { color: '#466b88', ink: '#f3ead6' }, // steel
  { color: '#5aa0d8', ink: '#0f2138' }, // sky
]

// FNV-1a: stable per title, so a book keeps its size between builds.
function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function inkFor(hex) {
  let value = hex.replace('#', '')
  if (value.length === 3) value = [...value].map((c) => c + c).join('')
  const n = parseInt(value, 16)
  const luminance = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
  return luminance > 0.6 ? '#2a1a0a' : '#f3e8d0'
}

// Sizes below are fractions of the shelf height, so spines scale with it.
const MAX_HEIGHT = 0.92
const FONT = 0.074 // ~12.5px on a 170px shelf
const MIN_FONT = 0.058
const EM_PER_CHAR = 0.65 // measured 0.53–0.63 for Fraunces 600 + letter-spacing, plus margin
const CLEARANCE = 0.22 // room kept for the decorations at each end; matches .book__title max-height

export function spineFor(project, index) {
  const h = hash(project.title)
  const swatch = project.color
    ? { color: project.color, ink: inkFor(project.color) }
    : PALETTE[index % PALETTE.length]

  // Grow the spine to fit its title, then shrink the font if it still doesn't; CSS ellipsizes the rest.
  const titleEms = project.title.length * EM_PER_CHAR
  const randomHeight = 0.7 + ((h >>> 8) % 16) / 100 // 0.70–0.85
  const height = Math.min(MAX_HEIGHT, Math.max(randomHeight, titleEms * FONT + CLEARANCE))
  const font = Math.max(MIN_FONT, Math.min(FONT, (height - CLEARANCE) / titleEms))

  return {
    ...swatch,
    width: 34 + (h % 22), // px, 34–55
    height: Math.round(height * 100), // %
    font,
    variant: (h >>> 16) % 3, // spine decoration
  }
}
