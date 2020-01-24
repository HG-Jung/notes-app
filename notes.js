const
    fs = require('fs'),
    chalk = require('chalk');

const getNotes = (() => {
  //  return console.log('Getting notes...');
})();

const loadNotes = () => {
    try {
        const
            dataBuffer = fs.readFileSync('notes.json'),
            dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const addNote = (title, body) => {
    const
        notes = loadNotes(),
        duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title:title,
            body:body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
};

const removeNote = (title) => {
    const
        notes = loadNotes(),
        notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed.'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse('No note found.'));
    }
};

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse('Your notes'));

    notes.forEach((note) => {
       console.log(note.title);
    });
};

const readNote = (title) => {
    const notes = loadNotes(),
          note = notes.find((note) => note.title === title);

    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
};

saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};


module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};