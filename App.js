// Script Modules

// Node Modules
const yargs = require('yargs')

// My Modules
const noteUtils = require('./Notes.js')

// Define script version
yargs.version('1.1.0')

// Define command line arguments as commanfds
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    noteUtils.addNote(argv.title, argv.body)
  }
})

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'The note title that is to be removed',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    noteUtils.removeNote(argv.title)
  }
})

yargs.command({
  command: 'list',
  describe: 'List your notes',
  handler() {
    noteUtils.listNotes()
  }
})

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'The note to read',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    noteUtils.readNote(argv.title)  
  }
})

// parse the command line arguments
yargs.parse()