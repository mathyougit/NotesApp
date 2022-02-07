// Script modules

// Core Modules
const fs = require('fs')

// Node Modules
const chalk = require('chalk')

// Define app functions
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('Notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (err) {
    return []
  }
}

const saveNotes = (n) => {
  const dataJSON = JSON.stringify(n)
  fs.writeFileSync('Notes.json', dataJSON)
}

const addNote = (t, b) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === t)
  if (!duplicateNote) {
      notes.push({
        title: t,
        body: b
      })
      saveNotes(notes)
      console.log(chalk.green.inverse('Note added.'))
  } else {
      console.log(chalk.red.inverse('Note title already exists. Note not added.'))
  }
}

const removeNote = (t) => {
  const notes = loadNotes()
  const newNotes = notes.filter((note) => note.title !== t)
  if (notes.length === newNotes.length) {
    console.log(chalk.red.inverse('Note "' + t + '" does not exist in notes. No note removed.'))
  } else {
    saveNotes(newNotes)
    console.log(chalk.green.inverse('Note "' + t + '" removed.'))
  }
}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.blue.inverse('Your notes:'))
  notes.forEach((note) => console.log(note.title))
} 

const readNote = (t) => {
  const notes = loadNotes()
  const noteToRead = notes.find((note) => note.title === t)
  if (noteToRead) {
    console.log(chalk.blue.inverse(noteToRead.title))
    console.log(noteToRead.body)
  } else {console.log(chalk.red.inverse('No note of title ' + t))}
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}