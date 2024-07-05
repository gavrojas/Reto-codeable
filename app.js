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
          <button class="edit" onclick="editNote(this)">Editar<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5.83331 5.83334H4.99998C4.55795 5.83334 4.13403 6.00894 3.82147 6.3215C3.50891 6.63406 3.33331 7.05798 3.33331 7.50001V15C3.33331 15.442 3.50891 15.866 3.82147 16.1785C4.13403 16.4911 4.55795 16.6667 4.99998 16.6667H12.5C12.942 16.6667 13.3659 16.4911 13.6785 16.1785C13.9911 15.866 14.1666 15.442 14.1666 15V14.1667" stroke="#FAF6F6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.3333 4.16666L15.8333 6.66666M16.9875 5.4875C17.3157 5.15929 17.5001 4.71415 17.5001 4.25C17.5001 3.78585 17.3157 3.3407 16.9875 3.0125C16.6593 2.68429 16.2142 2.49991 15.75 2.49991C15.2858 2.49991 14.8407 2.68429 14.5125 3.0125L7.5 10V12.5H10L16.9875 5.4875Z" stroke="#FAF6F6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="save hide" onclick="saveNoteEdit(this)">Guardar<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.6667 2.5C13.1063 2.50626 13.5256 2.68598 13.8333 3L17 6.16667C17.314 6.47438 17.4937 6.89372 17.5 7.33333V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H12.6667Z" stroke="#FAF6F6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.1666 17.5V11.6667C14.1666 11.4457 14.0788 11.2337 13.9226 11.0774C13.7663 10.9211 13.5543 10.8333 13.3333 10.8333H6.66665C6.44563 10.8333 6.23367 10.9211 6.07739 11.0774C5.92111 11.2337 5.83331 11.4457 5.83331 11.6667V17.5M5.83331 2.5V5.83333C5.83331 6.05435 5.92111 6.26631 6.07739 6.42259C6.23367 6.57887 6.44563 6.66667 6.66665 6.66667H12.5" stroke="#FAF6F6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="cancel hide" onclick="cancelNoteEdit(this)">Cancelar<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.00002 14.1667L10 11.1667L13 14.1667L14.1667 13L11.1667 9.99999L14.1667 6.99999L13 5.83332L10 8.83332L7.00002 5.83332L5.83335 6.99999L8.83335 9.99999L5.83335 13L7.00002 14.1667ZM10 18.3333C8.84724 18.3333 7.76391 18.1144 6.75002 17.6767C5.73613 17.2389 4.85419 16.6453 4.10419 15.8958C3.35419 15.1464 2.76058 14.2644 2.32335 13.25C1.88613 12.2355 1.66724 11.1522 1.66669 9.99999C1.66613 8.84777 1.88502 7.76443 2.32335 6.74999C2.76169 5.73555 3.3553 4.8536 4.10419 4.10416C4.85308 3.35471 5.73502 2.7611 6.75002 2.32332C7.76502 1.88555 8.84835 1.66666 10 1.66666C11.1517 1.66666 12.235 1.88555 13.25 2.32332C14.265 2.7611 15.147 3.35471 15.8959 4.10416C16.6447 4.8536 17.2386 5.73555 17.6775 6.74999C18.1164 7.76443 18.335 8.84777 18.3334 9.99999C18.3317 11.1522 18.1128 12.2355 17.6767 13.25C17.2406 14.2644 16.647 15.1464 15.8959 15.8958C15.1447 16.6453 14.2628 17.2392 13.25 17.6775C12.2372 18.1158 11.1539 18.3344 10 18.3333ZM10 16.6667C11.8611 16.6667 13.4375 16.0208 14.7292 14.7292C16.0209 13.4375 16.6667 11.8611 16.6667 9.99999C16.6667 8.13888 16.0209 6.56249 14.7292 5.27082C13.4375 3.97916 11.8611 3.33332 10 3.33332C8.13891 3.33332 6.56252 3.97916 5.27085 5.27082C3.97919 6.56249 3.33335 8.13888 3.33335 9.99999C3.33335 11.8611 3.97919 13.4375 5.27085 14.7292C6.56252 16.0208 8.13891 16.6667 10 16.6667Z" fill="#FAF6F6"/></svg></button>
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
        <button class="edit" onclick="editNote(this)">Editar<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5.83331 5.83334H4.99998C4.55795 5.83334 4.13403 6.00894 3.82147 6.3215C3.50891 6.63406 3.33331 7.05798 3.33331 7.50001V15C3.33331 15.442 3.50891 15.866 3.82147 16.1785C4.13403 16.4911 4.55795 16.6667 4.99998 16.6667H12.5C12.942 16.6667 13.3659 16.4911 13.6785 16.1785C13.9911 15.866 14.1666 15.442 14.1666 15V14.1667" stroke="#FAF6F6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.3333 4.16666L15.8333 6.66666M16.9875 5.4875C17.3157 5.15929 17.5001 4.71415 17.5001 4.25C17.5001 3.78585 17.3157 3.3407 16.9875 3.0125C16.6593 2.68429 16.2142 2.49991 15.75 2.49991C15.2858 2.49991 14.8407 2.68429 14.5125 3.0125L7.5 10V12.5H10L16.9875 5.4875Z" stroke="#FAF6F6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="save hide" onclick="saveNoteEdit(this)">Guardar<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.6667 2.5C13.1063 2.50626 13.5256 2.68598 13.8333 3L17 6.16667C17.314 6.47438 17.4937 6.89372 17.5 7.33333V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H12.6667Z" stroke="#FAF6F6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.1666 17.5V11.6667C14.1666 11.4457 14.0788 11.2337 13.9226 11.0774C13.7663 10.9211 13.5543 10.8333 13.3333 10.8333H6.66665C6.44563 10.8333 6.23367 10.9211 6.07739 11.0774C5.92111 11.2337 5.83331 11.4457 5.83331 11.6667V17.5M5.83331 2.5V5.83333C5.83331 6.05435 5.92111 6.26631 6.07739 6.42259C6.23367 6.57887 6.44563 6.66667 6.66665 6.66667H12.5" stroke="#FAF6F6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="cancel hide" onclick="cancelNoteEdit(this)">Cancelar<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.00002 14.1667L10 11.1667L13 14.1667L14.1667 13L11.1667 9.99999L14.1667 6.99999L13 5.83332L10 8.83332L7.00002 5.83332L5.83335 6.99999L8.83335 9.99999L5.83335 13L7.00002 14.1667ZM10 18.3333C8.84724 18.3333 7.76391 18.1144 6.75002 17.6767C5.73613 17.2389 4.85419 16.6453 4.10419 15.8958C3.35419 15.1464 2.76058 14.2644 2.32335 13.25C1.88613 12.2355 1.66724 11.1522 1.66669 9.99999C1.66613 8.84777 1.88502 7.76443 2.32335 6.74999C2.76169 5.73555 3.3553 4.8536 4.10419 4.10416C4.85308 3.35471 5.73502 2.7611 6.75002 2.32332C7.76502 1.88555 8.84835 1.66666 10 1.66666C11.1517 1.66666 12.235 1.88555 13.25 2.32332C14.265 2.7611 15.147 3.35471 15.8959 4.10416C16.6447 4.8536 17.2386 5.73555 17.6775 6.74999C18.1164 7.76443 18.335 8.84777 18.3334 9.99999C18.3317 11.1522 18.1128 12.2355 17.6767 13.25C17.2406 14.2644 16.647 15.1464 15.8959 15.8958C15.1447 16.6453 14.2628 17.2392 13.25 17.6775C12.2372 18.1158 11.1539 18.3344 10 18.3333ZM10 16.6667C11.8611 16.6667 13.4375 16.0208 14.7292 14.7292C16.0209 13.4375 16.6667 11.8611 16.6667 9.99999C16.6667 8.13888 16.0209 6.56249 14.7292 5.27082C13.4375 3.97916 11.8611 3.33332 10 3.33332C8.13891 3.33332 6.56252 3.97916 5.27085 5.27082C3.97919 6.56249 3.33335 8.13888 3.33335 9.99999C3.33335 11.8611 3.97919 13.4375 5.27085 14.7292C6.56252 16.0208 8.13891 16.6667 10 16.6667Z" fill="#FAF6F6"/></svg></button>
        <button class="delete" onclick="deleteNote(this)">Borrar<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5.83337 17.5C5.37504 17.5 4.98282 17.3369 4.65671 17.0108C4.3306 16.6847 4.16726 16.2922 4.16671 15.8333V5H3.33337V3.33333H7.50004V2.5H12.5V3.33333H16.6667V5H15.8334V15.8333C15.8334 16.2917 15.6703 16.6842 15.3442 17.0108C15.0181 17.3375 14.6256 17.5006 14.1667 17.5H5.83337ZM14.1667 5H5.83337V15.8333H14.1667V5ZM7.50004 14.1667H9.16671V6.66667H7.50004V14.1667ZM10.8334 14.1667H12.5V6.66667H10.8334V14.1667Z" fill="#4F4F4F"/></svg></button>
      </div>
    `;
    list.appendChild(li);

    // limpio texto del textarea luego de añadir nueva nota
    textAreaNote.value = '';
    btnCreateNote.disabled = true;
  }
}

// Editar el texto de la nota
function editNote(button){
  const liElement = button.closest('li');
  const pEditable = liElement.querySelector('p');
  const newInput = document.createElement('input');

  newInput.id = 'editable';
  newInput.type = 'text';
  newInput.value = pEditable.textContent

  liElement.replaceChild(newInput, pEditable);
  liElement.classList.add('edit-mode')

  // Estado de visibilidad botones
  const btnSave = liElement.querySelector('.save');
  const btnCancel = liElement.querySelector('.cancel');

  btnSave.classList.remove('hide')
  btnCancel.classList.remove('hide')
}

// Guardar la nota con la edición realizada
function saveNoteEdit(button){
  const liElement = button.closest('li');
  const noteId = liElement.getAttribute('data-id');
  const newInput = document.querySelector('input');

  let existingNotes = JSON.parse(localStorage.getItem('notes')) || [];

  existingNotes = existingNotes.map(note => {
    if(note.id === noteId){
      note.text = newInput.value;
    }

    return note
  });

  // Actualizar las notas en localStorage
  localStorage.setItem('notes', JSON.stringify(existingNotes));

  const pEditado = document.createElement('p');
  pEditado.textContent = newInput.value;
  liElement.replaceChild(pEditado, newInput);
  liElement.classList.remove('edit-mode');

  // Estado de visibilidad botones
  const btnSave = liElement.querySelector('.save');
  const btnCancel = liElement.querySelector('.cancel');

  btnSave.classList.add('hide')
  btnCancel.classList.add('hide')
}

// Cancelar la edición de la nota
function cancelNoteEdit(button){
  const liElement = button.closest('li');
  const noteId = liElement.getAttribute('data-id');
  const newInput = document.querySelector('input');

  let existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
  const originalNote = existingNotes.find(note => note.id === noteId);

  const pEditado = document.createElement('p');
  pEditado.textContent = originalNote.text;
  liElement.replaceChild(pEditado, newInput);
  liElement.classList.remove('edit-mode');

  // Estado de visibilidad botones
  const btnSave = liElement.querySelector('.save');
  const btnCancel = liElement.querySelector('.cancel');

  btnSave.classList.add('hide')
  btnCancel.classList.add('hide')
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