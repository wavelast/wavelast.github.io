import { useLayoutEffect, useRef, useState } from 'react'
import Book from './Book.jsx'

const MIN_SHELVES = 3
const BOOK_GAP = 2 // keep in sync with .shelf__books gap
const COMPACT_BELOW = 460 // shelf width (px) where books shrink

// Fill shelves left to right, starting a new shelf when the next book won't fit.
function packShelves(books, shelfWidth, scale) {
  const shelves = [[]]
  let used = 0
  for (const book of books) {
    const width = book.spine.width * scale
    if (used + width > shelfWidth && shelves.at(-1).length > 0) {
      shelves.push([])
      used = 0
    }
    shelves.at(-1).push(book)
    used += width + BOOK_GAP
  }
  while (shelves.length < MIN_SHELVES) shelves.push([])
  return shelves
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
  const shelves = packShelves(books, shelfWidth || Infinity, scale)

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
