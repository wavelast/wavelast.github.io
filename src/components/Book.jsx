export default function Book({ book, scale, onOpen }) {
  const { project, spine } = book
  const className = `book book--v${spine.variant}`
  const style = {
    '--c': spine.color,
    '--ink': spine.ink,
    '--w': `${spine.width * scale}px`,
    '--h': spine.height,
    '--fs': spine.font,
  }

  // Filler books have no project: decoration only, hidden from screen readers.
  if (!project) return <div className={`${className} book--filler`} style={style} aria-hidden="true" />

  return (
    <button type="button" className={className} style={style} aria-haspopup="dialog" onClick={() => onOpen(book)}>
      <span className="book__title">{project.title}</span>
    </button>
  )
}
