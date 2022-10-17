
export default class NotesApi{
    static getAllNotes(){
        const allNotes = JSON.parse(localStorage.getItem('notes-app')) || [];
        return allNotes.sort((a,b)=>{
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static saveNotes(noteToSave){
        const notes = NotesApi.getAllNotes();

        const existedNote = notes.find((n)=> n.id == noteToSave.id);

        if(existedNote){
            existedNote.title = noteToSave.title;
            existedNote.body = noteToSave.body;
            existedNote.updated = new Date().toISOString();
        }
        else{
            noteToSave.id = new Date().getTime();
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
        }

        localStorage.setItem('notes-app',JSON.stringify(notes));
    }
    static deleteNotes(id){
        const notes = NotesApi.getAllNotes();
        const filteredNotes = notes.filter(n => n.id != id);

        localStorage.setItem('notes-app',JSON.stringify(filteredNotes));
    }
}

NotesApi.deleteNotes(3)