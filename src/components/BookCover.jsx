import { useEffect, useRef } from 'react'

// An open book: the cover side on the left, a page on the right.
// A native <dialog> gives us focus trapping, Escape to close, and focus
// returning to the book for free.
export default function BookCover({ book, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (book && !dialog.open) dialog.showModal()
    if (!book && dialog.open) dialog.close()
  }, [book])

  const close = () => dialogRef.current.close()

  return (
    <dialog
      ref={dialogRef}
      className="cover"
      aria-labelledby="cover-title"
      style={book ? { '--c': book.spine.color, '--ink': book.spine.ink } : undefined}
      onClose={onClose}
      // The dialog has no padding, so a click whose target is the dialog itself hit the backdrop.
      onClick={(e) => e.target === dialogRef.current && close()}
    >
      {book && (
        <div className="cover__spread">
          <button type="button" className="cover__close" aria-label="Close" onClick={close}>
            ×
          </button>

          <div className="cover__front">
            {book.project.year && <p className="cover__year">{book.project.year}</p>}
            <h2 id="cover-title" className="cover__title">
              {book.project.title}
            </h2>
            {book.project.tags?.length > 0 && (
              <ul className="cover__tags">
                {book.project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="cover__page">
            {book.project.description && <p className="cover__desc">{book.project.description}</p>}
            {book.project.links?.length > 0 && (
              <div className="cover__links">
                {book.project.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    {link.label} <span aria-hidden="true">↗&#xFE0E;</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}
