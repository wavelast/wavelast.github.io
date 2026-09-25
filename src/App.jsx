import { useState } from 'react'
import Bookcase from './components/Bookcase.jsx'
import BookCover from './components/BookCover.jsx'
import { projects, site } from './content.js'
import { spineFor } from './lib/spine.js'

const books = projects.map((project, index) => ({
  id: index,
  project,
  spine: spineFor(project, index),
}))

export default function App() {
  const [openBook, setOpenBook] = useState(null)

  return (
    <main className="page">
      {site.name && <h1 className="site-name">{site.name}</h1>}

      <Bookcase books={books} onOpen={setOpenBook} />

      <BookCover book={openBook} onClose={() => setOpenBook(null)} />
    </main>
  )
}
