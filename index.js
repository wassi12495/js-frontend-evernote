document.addEventListener("DOMContentLoaded", function(){
  // alert('hi')
  Adapter.getNotes()
  let newNote = document.getElementById('new-note')
  newNote.addEventListener('click', function(){
    Notes.newNote()
  })



})
