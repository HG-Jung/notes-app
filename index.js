// Custom libs
const notes = require('./notes');

// Third party libs
const
    chalk = require('chalk'),
    yargs = require('yargs');
//  validator = require('validator');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add new note',
        title: {
            describe: 'Note title',
            demandOption: true,
             type: 'string'
        },
        builder: {
            body: {
                describe: 'Note body',
                demandOption: true,
                type: 'string'
            }
        },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
});

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove note',
    builder: {
      title: {
          describe: 'Note title',
          demandOption: true,
          type: 'string'
      }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
});

// Create list command
yargs.command({
   command: 'list',
    describe: 'Listing note',
    handler() {
        notes.listNotes();
    }
});

// Create read command
yargs.command({
   command: 'read',
   describe: 'Reading note',
    builder: {
       title: {
           describe: 'Note title',
           demandOption: true,
           type: 'string'
       }
    },
   handler(argv) {
        notes.readNote(argv.title);
   }
});

yargs.parse();
