import NotesApi from "./notesAPI.js";
import NotesView from "./notesView.js";

const root = document.querySelector('#root');

const view = new NotesView(root,{
    oneNoteAdd(){
        console.log('note has been added')
    },
    oneNoteEdite(newTitle , newBody){
        console.log(newTitle,newBody)
    },
    oneNoteSelect(noteId){
        console.log(noteId);
    },
    oneNoteDelete(noteId){
        console.log('dele')
    }
});

view.updateNoteList(NotesApi.getAllNotes())
console.log('test')

