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
        console.log("this.notes: ", this.notes)
    }

    // Add a note
    addNote(){
        
    }


    // Edit a note
    editNote(id){
        console.log(`Editing note ${id}`)
    }

    // Delete a note
    deleteNote(id){
        console.log(`Deleting note ${id}`)
    }


    // Label a note as important

    // Store a note in localStorage

    // Render notes
    renderNotes(){
        const $notesList = document.getElementById("notes-list")
        $notesList.innerHTML = ``
        this.notes.forEach( note => {
            const $li = document.createElement('li')
            console.log("note.description: ",note.description)
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
        const newDescription = document.getElementById("add-note-input").value
        document.getElementById("add-note-input").value = ""
        const notesList = notesManager.notes
        notesList.push({id: 1, description: newDescription, important:false})
        localStorage.setItem("notes", JSON.stringify(notesList))
        notesManager.renderNotes()
    })
})