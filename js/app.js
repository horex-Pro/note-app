import NotesApi from "./notesAPI.js";
import NotesView from "./notesView.js";

export default class App {
    constructor(root){
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root,this._handlres())
        this._refreshNotes()
    }

    _refreshNotes(){
        const notes = NotesApi.getAllNotes();
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);

        this.activeNote = notes;
        this.view.updateActiveNote(notes[0])
    }

    _handlres(){
        return{
            oneNoteAdd: ()=>{
                const newNote = {
                    title:"New Note",
                    body: "Take some note"
                }
                NotesApi.saveNotes(newNote);
                this._refreshNotes();
            },
            oneNoteEdite:(newTitle , newBody)=>{
                NotesApi.saveNotes({
                    id : this.activeNote.id,
                    title: newTitle,
                    body: newBody,
                });
                this._refreshNotes()
            },
            oneNoteSelect:(noteId)=>{
                const selectedNote = this.notes.find((note) => note.id == noteId);
                this.activeNote = selectedNote;
                console.log(this.activeNote)
                this.view.updateActiveNote(selectedNote);
            },
            oneNoteDelete:(noteId)=>{
                NotesApi.deleteNotes(noteId);
                this._refreshNotes()
            }
        }
    }
}

