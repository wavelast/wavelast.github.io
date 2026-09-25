import { useLayoutEffect, useRef, useState } from 'react'
import Book from './Book.jsx'
import { fillerSpine, MIN_WIDTH } from '../lib/spine.js'

const MIN_SHELVES = 3
const BOOK_GAP = 2 // keep in sync with .shelf__books gap
const COMPACT_BELOW = 460 // shelf width (px) where books shrink

// Deal projects across the shelves like cards (1st top, 2nd middle, 3rd bottom, 4th top...),
// pad each shelf out with untitled filler books, and space the projects evenly among them.
function layoutShelves(books, shelfWidth, scale) {
  const widthOf = (book) => book.spine.width * scale + BOOK_GAP

  // Add a shelf only if a shelf's own projects wouldn't fit on it.
  let dealt
  for (let count = MIN_SHELVES; ; count++) {
    dealt = Array.from({ length: count }, () => [])
    books.forEach((book, i) => dealt[i % count].push(book))
    const fits = dealt.every((shelf) => shelf.reduce((sum, book) => sum + widthOf(book), 0) <= shelfWidth + BOOK_GAP)
    if (fits || count >= books.length) break
  }

  return dealt.map((projects, s) => {
    let used = projects.reduce((sum, book) => sum + widthOf(book), 0)
    const fillers = []
    for (let n = 0; ; n++) {
      const filler = { id: `filler-${s}-${n}`, spine: fillerSpine(s, n) }
      if (used + filler.spine.width * scale > shelfWidth) {
        // Squeeze a narrower last book into the gap if one fits, so shelves end full.
        const room = Math.floor((shelfWidth - used) / scale)
        if (room >= MIN_WIDTH) fillers.push({ ...filler, spine: { ...filler.spine, width: room } })
        break
      }
      fillers.push(filler)
      used += widthOf(filler)
    }

    const total = projects.length + fillers.length
    const byPosition = new Map(projects.map((book, j) => [Math.floor(((j + 0.5) * total) / projects.length), book]))
    let f = 0
    return Array.from({ length: total }, (_, position) => byPosition.get(position) ?? fillers[f++])
  })
}

export default function Bookcase({ books, onOpen }) {
  const rowRef = useRef(null)
  const [shelfWidth, setShelfWidth] = useState(0)

  // Measure before paint so books never flash onto the wrong shelf.
  useLayoutEffect(() => {
    const row = rowRef.current
    const measure = () => {
      const style = getComputedStyle(row)
      setShelfWidth(row.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(row)
    return () => observer.disconnect()
  }, [])

  const compact = shelfWidth > 0 && shelfWidth < COMPACT_BELOW
  const scale = compact ? 0.8 : 1
  // Before the first measurement there's no width to fill, so skip packing (this render is never painted).
  const shelves = shelfWidth ? layoutShelves(books, shelfWidth, scale) : [books]

  return (
    <div className={`bookcase${compact ? ' bookcase--compact' : ''}`}>
      <div className="bookcase__crown" />

      <div className="bookcase__body">
        {shelves.map((shelf, i) => (
          <div className="shelf" key={i}>
            <div className="shelf__books" ref={i === 0 ? rowRef : undefined}>
              {shelf.map((book) => (
                <Book key={book.id} book={book} scale={scale} onOpen={onOpen} />
              ))}
            </div>
            <div className="shelf__plank" />
          </div>
        ))}
      </div>

      <div className="bookcase__base" />
    </div>
  )
}
