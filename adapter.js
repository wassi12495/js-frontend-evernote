class Adapter{
  constructor(){

  }

  static createNote(jsonBody){

      fetch('http://localhost:3000/api/v1/notes', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(jsonBody)
      })
      .then(response => response.json())
      .then(json => Adapter.getNotes(json))
  }

  static getNotes(resp = 0){

    fetch("http://localhost:3000/api/v1/users/")
      .then(response => response.json())
      .then(json => {
        document.getElementById('note-list').innerHTML = ""
        console.log(json[0])
        let user = document.getElementsByClassName('user-div')[0]
        user.innerHTML = `Username: ${json[0].name}`
        user.id = `${json[0].id}`
        json[0].notes.forEach(function(note){
          console.log(note)
          Notes.makeListDiv(note)
        })
      })
    .then(function(){
      if(resp !== 0){
        Notes.makePanelDiv(resp)
        console.log(resp)
      }
    })
  }

  static saveNote(jsonBody){

    fetch(`http://localhost:3000/api/v1/notes/${jsonBody.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(jsonBody)
    })
    .then(function(){Adapter.getNotes()})
  }

  static deleteNote(noteId){

    fetch(`http://localhost:3000/api/v1/notes/${noteId}`, {
      method: 'DELETE'
    })
    .then(function(){
      Adapter.getNotes()
    })
  }

}
