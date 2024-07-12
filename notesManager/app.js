class Note{
    constructor(id, description, isImportant=false){
        this.id = id
        this.description = description
        this.isImportant = isImportant
    }

    toggleIsImportant(){
        this.important = !this.important
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
        const newid = this.notes.length?this.notes[this.notes.length - 1].id + 1:1
        console.log("newid: ", newid)
        const newNote = new Note(newid, newDescription, false)
        this.notes.push(newNote)
        this.saveNotes()
        this.renderNotes()
    }

    // Edit a note
    editNote(id){
        const newDescription = prompt("Please enter a new description: ")
        while(!newDescription){
            newDescription = prompt("Ingrese nueva descripción de la tarea: ")
            if(!newDescription){
                alert("Debe ingresar una descripción")
            }else{
                break
            }
        }
        this.notes.forEach(note => {
            note.description = note.id===id?newDescription:note.description
        })
        this.saveNotes()
        this.renderNotes()
    }

    // Delete a note
    deleteNote(id){
        this.notes = this.notes.filter(note => note.id !== id)
        this.saveNotes()
        this.renderNotes()
    }

    saveNotes(){
        localStorage.setItem('notes', JSON.stringify(this.notes))
    }

    // Label a note as important
    toggleImportant(id){
        this.notes.forEach(note => note.isImportant = note.id===id?!note.isImportant:note.isImportant)
        this.saveNotes()
        this.renderNotes()
    }

    // Render notes
    renderNotes(){
        const $notesList = document.getElementById("notes-list")
        $notesList.innerHTML = ``
        this.notes.forEach( note => {
            const $li = document.createElement('li')
            $li.innerText = note.description
            $li.className = note.isImportant?"important-note":""
            $li.addEventListener('click', ()=>{
                console.log("You clicked the list")
                this.toggleImportant(note.id)
            })
            console.log("note.isImportant: ", note.isImportant)
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