class Notes{
  constructor(){
    //class constructor --empty
  }

  static makeListDiv(note){
    //create div to store note in the note list sidebar
    let div = document.createElement('div')
    div.addEventListener('click', function(e){
      Notes.makePanelDiv(note)
    })

    div.id = note.id
    div.class = `card`

    div.innerHTML = `<div class="card-block">
    <h4 class="card-title">${Notes.abbrTitle(note.title)}</h4>
    <p class="card-text">${Notes.abbrBody(note.body)}</p>
  </div>`
    let noteList = document.getElementById('note-list')
    noteList.append(div)
  }

  static abbrTitle(title){
    if (title.length > 15){
      return (title.split().splice(0,15).join() + "..")
    }else{
      return title
    }
  }

  static abbrBody(body){
    if (body.length > 25){
      return (body.split(" ").splice(0,22).join(" ") + "...")
    }else{
      return body
    }
  }

  static makePanelDiv(note){
    // create div to show note in the note panel sidebar

    let panelDiv = document.createElement('div')
    panelDiv.id = note.id
    panelDiv.innerHTML = Notes.render(note)
    let notePanel = document.getElementById('note-panel')
    notePanel.innerHTML = ""
    notePanel.append(panelDiv)

    let submitNote = document.getElementById(`${note.id}-submit`)
    submitNote.addEventListener('click', function(event){
      let formTitle = document.getElementById(`${note.id}-title`).value
      let formBody = document.getElementById(`${note.id}-body`).value
      let jsonBody = {title: formTitle, body: formBody, id: `${note.id}`}
      Adapter.saveNote(jsonBody)
    })

    let deleteNote = document.getElementById(`${note.id}-delete`)
    deleteNote.addEventListener('click', function(event){
      Adapter.deleteNote(`${note.id}`)
    })

  }

  static newNote(){
    let panelDiv = document.createElement('div')
    panelDiv.innerHTML = Notes.renderNewNote()
    let notePanel = document.getElementById('note-panel')
    notePanel.innerHTML = ""
    notePanel.append(panelDiv)
    let submitNewNote = document.getElementById('new-note-submit')
    submitNewNote.addEventListener('click', function(e){
      e.preventDefault()
      let noteTitle = document.getElementById("new-note-title").value
      let noteBody = document.getElementById("new-note-body").value
      let userId = parseInt(document.getElementsByClassName("user-div")[0].id)
      console.log(userId)
      let jsonBody = {title: noteTitle, body: noteBody, user_id: userId }

      Adapter.createNote(jsonBody)
      notePanel.innerHTML = ""
    })
  }

  static renderNewNote(){
    return (
      `
      <div>

        <label> Title: </label>
        <textarea class="title-area" id="new-note-title" name="title" placeholder="New Note Title">

        </textarea>
        </div>
      <div>
        <textarea style="height:60vh" class="title-area" name="note" id="new-note-body" placeholder="New Note Body">

        </textarea>
      </div>
      <button type="submit" id="new-note-submit" class="btn btn-primary" value="Create">Create</button>
  `)
  }



  static render(note) {
    return (
      `
        <div>
          <label> Title: </label>
          <textarea class="title-area" id="${note.id}-title" name="title" value="${note.title}">${note.title}
          </textarea>

          <textarea style="height:60vh" class="title-area" name="note" id="${note.id}-body" value="${note.body}">
          ${note.body}
          </textarea>
        </div>

        <button  id="${note.id}-submit" class="btn btn-primary" value="Save"> Save </button>
        <button  id="${note.id}-delete" class="btn btn-danger" value="Delete"> Delete</button>
      `
    )
  }

}
