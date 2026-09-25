export default function Book({ book, scale, onOpen }) {
  const { project, spine } = book

  return (
    <button
      type="button"
      className={`book book--v${spine.variant}`}
      style={{
        '--c': spine.color,
        '--ink': spine.ink,
        '--w': `${spine.width * scale}px`,
        '--h': spine.height,
        '--fs': spine.font,
      }}
      aria-haspopup="dialog"
      onClick={() => onOpen(book)}
    >
      <span className="book__title">{project.title}</span>
    </button>
  )
}
