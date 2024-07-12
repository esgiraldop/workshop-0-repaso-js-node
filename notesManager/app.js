class Note{
    constructor(id, description, isImportant){
        this.id = id
        this.description = description
        this.isImportant = isImportant
    }
}

class NotesManager{
    constructor(){
        localStorage.getItem("notes")===""&&localStorage.removeItem("notes") // Delete local storage variable in case it is empty
        this.notes = JSON.parse(localStorage.getItem("notes")) || []
    }

    // Add a note
    addNote(){
        const newDescription = document.getElementById("add-note-input").value
        document.getElementById("add-note-input").value = ""
        const newid = this.notes.length?this.notes[this.notes.length - 1]:1
        const newNote = new Note(newid, newDescription, false)
        this.notes.push(newNote)
        this.saveNotes()
        this.renderNotes()
    }

    // Edit a note
    editNote(id){
        const newDescription = prompt("Please enter a new description: ")
        this.notes.forEach(note => {
            note.description = note.id===id&&newDescription
        })
        this.saveNotes()
        this.renderNotes()
    }

    // Delete a note
    deleteNote(id){
        console.log("this.notes: ", this.notes)
        this.notes = this.notes.filter(note => note.id !== id)
        console.log("this.notes: ", this.notes)
        this.saveNotes()
        this.renderNotes()
    }

    saveNotes(){
        localStorage.setItem('notes', JSON.stringify(this.notes))
    }

    // Label a note as important

    // Store a note in localStorage

    // Render notes
    renderNotes(){
        const $notesList = document.getElementById("notes-list")
        $notesList.innerHTML = ``
        this.notes.forEach( note => {
            const $li = document.createElement('li')
            $li.innerText = note.description
            //Edit button
            const $editButton = document.createElement("button")
            $editButton.innerText = "Edit"
            $editButton.addEventListener('click', () =>{
                this.editNote(note.id)
            })
            $li.appendChild($editButton)
            
            //Delete button
            const $deleteButton = document.createElement("button")
            $deleteButton.innerText = "Delete"
            $deleteButton.addEventListener('click', () =>{
                this.deleteNote(note.id)
            })
            $li.appendChild($deleteButton)

            //Appending to html
            $notesList.appendChild($li)
        })
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    const notesManager = new NotesManager()
    const $addNoteButton = document.getElementById("add-note-button")
    notesManager.renderNotes()
    $addNoteButton.addEventListener("click", ()=>{
        notesManager.addNote()
    })
})