const list = document.getElementById("list");
const form = document.getElementById("form");
const textAreaNote = document.getElementById("new-note");
const btnCreateNote = document.getElementById('btn-create-note');

document.addEventListener('DOMContentLoaded', displayAllNotes);

function displayAllNotes() {
  list.innerHTML = ''; // Limpiar la lista antes de mostrar las notas

  // Obtener las notas del localStorage
  const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];

  // Iterar sobre cada nota y crear el elemento li correspondiente
  existingNotes.forEach(note => {
      const li = document.createElement('li');
      console.log(note.color);
      li.classList.add('note');
      if (note.color) {
        li.classList.add(note.color);
      }
      li.setAttribute('data-id', note.id);
      li.innerHTML = `
        <p>${note.text}</p>
        <div class="buttons">
          <button class="option pink" onclick="changeColor(this)"></button>
          <button class="option green" onclick="changeColor(this)"></button>
          <button class="option blue" onclick="changeColor(this)"></button>
          <button class="btn-edit" onclick="editNote(this)">Editar</button>
          <button class="delete" onclick="deleteNote(this)">Borrar<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5.83337 17.5C5.37504 17.5 4.98282 17.3369 4.65671 17.0108C4.3306 16.6847 4.16726 16.2922 4.16671 15.8333V5H3.33337V3.33333H7.50004V2.5H12.5V3.33333H16.6667V5H15.8334V15.8333C15.8334 16.2917 15.6703 16.6842 15.3442 17.0108C15.0181 17.3375 14.6256 17.5006 14.1667 17.5H5.83337ZM14.1667 5H5.83337V15.8333H14.1667V5ZM7.50004 14.1667H9.16671V6.66667H7.50004V14.1667ZM10.8334 14.1667H12.5V6.66667H10.8334V14.1667Z" fill="#4F4F4F"/></svg></button>
        </div>
      `;
      list.appendChild(li);
  })
}

textAreaNote.addEventListener('input', () => {
  btnCreateNote.disabled = textAreaNote.value.trim() === '';
});


form.addEventListener('submit', (e) =>{
  e.preventDefault();
  addNote();
})

//función para añadir nota
function addNote (){
  // capturo texto de la nueva nota sin espacios al inicio y al final
  const inputNote = textAreaNote.value.trim();

  // valido que la nueva nota tenga contenido
  if(inputNote !== ''){
    const newNote = {
      id: Date.now().toString(),
      text: inputNote,
      color: ''
    };
  
    // Obtener las notas existentes de localStorage, si no hay nada en notes, será un array vacío, no null.
    let existingNotes = JSON.parse(localStorage.getItem('notes')) || [];

     // Agregar la nueva nota al array de notas
    existingNotes.push(newNote);
    console.log(existingNotes);

     // Guardar el array de notas actualizado en localStorage
    localStorage.setItem('notes', JSON.stringify(existingNotes));

    // creo el nuevo elemento li con su calse note
    const li = document.createElement('li');
    li.classList.add('note');
    li.setAttribute('data-id', newNote.id);
    li.innerHTML = `
      <p>${newNote.text}</p>
      <div class="buttons">
        <button class="option pink" onclick="changeColor(this)"></button>
        <button class="option green" onclick="changeColor(this)"></button>
        <button class="option blue" onclick="changeColor(this)"></button>
        <button class="btn-edit" onclick="editNote(this)">Editar</button>
        <button class="delete" onclick="deleteNote(this)">Borrar<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5.83337 17.5C5.37504 17.5 4.98282 17.3369 4.65671 17.0108C4.3306 16.6847 4.16726 16.2922 4.16671 15.8333V5H3.33337V3.33333H7.50004V2.5H12.5V3.33333H16.6667V5H15.8334V15.8333C15.8334 16.2917 15.6703 16.6842 15.3442 17.0108C15.0181 17.3375 14.6256 17.5006 14.1667 17.5H5.83337ZM14.1667 5H5.83337V15.8333H14.1667V5ZM7.50004 14.1667H9.16671V6.66667H7.50004V14.1667ZM10.8334 14.1667H12.5V6.66667H10.8334V14.1667Z" fill="#4F4F4F"/></svg></button>
      </div>
    `;
    list.appendChild(li);

    // limpio texto del textarea luego de añadir nueva nota
    textAreaNote.value = '';
    btnCreateNote.disabled = true;
  }
}

function editNote(button){
  const liElement = button.closest('li');
  const pEditable = liElement.querySelector('p');
  const noteId = liElement.getAttribute('data-id');

  console.log(pEditable.textContent);
  let newText = prompt("Escribe en nuevo texto para tu nota: ");
  pEditable.textContent = newText;


  let existingNotes = JSON.parse(localStorage.getItem('notes')) || [];

  existingNotes = existingNotes.map(function(note){
    
    if(note.id == noteId){
      note.text = newText;
    }

    return note
  })

  // Actualizar las notas en localStorage
  localStorage.setItem('notes', JSON.stringify(existingNotes));

}

// función para eliminar nota
function deleteNote(button){
  const liElement = button.closest('li');
  const noteId = liElement.getAttribute('data-id');

  liElement.remove();
  let existingNotes = JSON.parse(localStorage.getItem('notes')) || [];

  // Filtrar la nota que se desea eliminar por su id y dejar en el arreglo existingNotes solo las que sean diferentes
  existingNotes = existingNotes.filter(note => note.id !== noteId);

  // Actualizar las notas en localStorage
  localStorage.setItem('notes', JSON.stringify(existingNotes));

}

//función para cambiar el color de las tarjetas de notas
function changeColor(button){
  const liElement = button.closest('li');
  const optionClass = button.classList[1];
  const noteId = liElement.getAttribute('data-id');
  const isAlreadyColored = liElement.classList.contains(optionClass);

  liElement.classList.remove('blue', 'pink', 'green');

  if (!isAlreadyColored){
    liElement.classList.add(optionClass);
  }

  let existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
  existingNotes = existingNotes.map(note => {
    if (note.id === noteId) {
        note.color = liElement.classList.contains(optionClass) ? optionClass : ''; // Actualizar el color
    }
    return note;
  });
  localStorage.setItem('notes', JSON.stringify(existingNotes));
}

// Función para detectar que el heigh completo de container notes es menor a la suma de todo su contenido 
function stateScrollbar() {
  const container = document.querySelector('.list-notes');
  if (container.scrollHeight > container.clientHeight) {
    container.classList.add('scrollbar');
  } else {
    container.classList.remove('scrollbar');
  }
}

stateScrollbar();

// Observar cambios en el contenido
const detectChanges = new MutationObserver(stateScrollbar);
detectChanges.observe(document.querySelector('.list-notes'), { 
  childList: true, 
  subtree: true 
});

// Verificar también el evento de redimensionamiento de la ventana y cambiar el estado de scroll
window.addEventListener('resize', stateScrollbar);