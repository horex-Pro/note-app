export default class NotesView {
  constructor(main, handlers) {
    this.main = main;

    const { oneNoteAdd, oneNoteEdite, oneNoteSelect, oneNoteDelete } = handlers;

    this.oneNoteAdd = oneNoteAdd;
    this.oneNoteEdite = oneNoteEdite;
    this.oneNoteSelect = oneNoteSelect;
    this.oneNoteDelete = oneNoteDelete;

    main.innerHTML = `
        <aside>
            <div class="logo">
                Easy Note
            </div>
            <br>
            <hr>
            <div class="notes-wrapper"></div>
        </aside>
        <div class="content">
            <div class="title">
                <h1>Create your notes</h1>
            </div>
            <hr>
            <div class="row">
                <button class="add-new-note">
                    <i class="fa-solid fa-plus"></i>
                    add new note
                </button>
            </div>
            <div class="inputs-wrapper">
                <input type="text" class="note-title" value="Note Title">
                <textarea name="" id="" cols="30" rows="10" class="note-body">Note Text</textarea>
            </div>
        </div>
        `;

    const addNoteBtn = this.main.querySelector(".add-new-note");
    const titleInput = this.main.querySelector(".note-title");
    const noteBody = this.main.querySelector(".note-body");

    addNoteBtn.addEventListener("click", (e) => {
      this.oneNoteAdd();
    });
    let textsInput = [titleInput, noteBody];

    textsInput.forEach((item) => {
      item.addEventListener("blur", (e) => {
        const newTextBody = noteBody.value.trim();
        const newTextTitle = titleInput.value.trim();

        this.oneNoteEdite(newTextTitle, newTextBody);
      });
    });
    // hide notes preview in first loading

    this.updateNotePreviewVisibility(false);
  }

  _createListItemHTML(id, title, body, updated) {
    let maxBodyLength = 50;
    return `
        <div class="note" data-note-id="${id}">
        <div class="note__title">
            ${title}
        </div>
        <hr>
        <div class="note-preview">
            ${body.substring(0, maxBodyLength)};
            ${body.length > maxBodyLength ? "..." : ""}
        </div>
        <hr>
        <div class="note-time">
            <div class="text">
            ${new Date(updated).toLocaleString("en", {
              dateStyle: "full",
              timeStyle: "short",
            })}
            </div>
            <div class="icon-parent" data-note-id="${id}"><i class="fa-solid fa-trash"></i></div>
            </div>
            </div>
            `;
  }

  updateNoteList(notes) {
    const notesContainer = this.main.querySelector(".notes-wrapper");

    notesContainer.innerHTML = "";

    let notesList = "";
    for (let note of notes) {
      const { id, title, body, updated } = note;
      const html = this._createListItemHTML(id, title, body, updated);

      notesList += html;
    }
    notesContainer.innerHTML = notesList;
    notesContainer.querySelectorAll(".note").forEach((noteItem) => {
      noteItem.addEventListener(
        "click",
        (e) => this.oneNoteSelect(noteItem.dataset.noteId)
        // noteItem.classList.add('active')
      );
    });

    const trashes = [...notesContainer.querySelectorAll(".icon-parent")];

    trashes.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        this.oneNoteDelete(item.dataset.noteId);
      });
    });
  }
  updateActiveNote(note) {
    this.main.querySelector(".note-title").value = note.title;
    this.main.querySelector(".note-body").value = note.body;
    const existedActiveNotes = this.main.querySelectorAll(".active");

    const arrayOfExistedActiveNotes = [...existedActiveNotes];
    arrayOfExistedActiveNotes.forEach((item) => {
      item.classList.remove("active");
    });

    let selectedNotes = this.main.querySelector(
      `.note[data-note-id="${note.id}"]`
    );
    selectedNotes.setAttribute("class", "active , note");
  }
  updateNotePreviewVisibility(visible) {
    this.main.querySelector(".inputs-wrapper").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}
