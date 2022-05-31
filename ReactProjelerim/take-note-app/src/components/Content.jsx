import React from 'react'
import AddNote from './AddNote'
import NotesList from './NotesList'
import Search from './Search'

const Content = () => {
  return (
    <div>
        <h3>Content</h3>
        <Search/>
        <AddNote/>
        <NotesList/>
            </div>
  )
}

export default Content