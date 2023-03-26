const btnEl=document.getElementById('btn');

const containerEl=document.getElementById('container');

getNotes().forEach((note)=>{
    const noteEl=createNoteEl(note.id,note.content);
    containerEl.insertBefore(noteEl,btnEl);
})

function createNoteEl(id,content)
{
    const element=document.createElement('textarea');

    element.classList.add('note');
    
    element.placeholder="Empty Note";

    element.value=content;

    element.addEventListener('dblclick',()=>{
        const warning=confirm('do you want to delete this note?');

        if(warning)
        {
            deleteNote(id, element);
        }
    })

    element.addEventListener('input',()=>{
        updateNote(id,element.value);
    })
    
    return element;
}

function deleteNote(id, element)
{
    const notes=getNotes().filter((note)=>note.id!=id);
    saveNotes(notes);
    containerEl.removeChild(element);
}

function updateNote(id, content)
{
    const notes=getNotes();
    const target=notes.filter((note)=>note.id==id)[0];
    target.content=content;
    saveNotes(notes);
}

function addNote()
{
    const notes=getNotes();
    const noteObj={
        id:Math.floor(Math.random()*100000),
        content:""
    }
    
    const noteEl=createNoteEl(noteObj.id, noteObj.content);

    containerEl.insertBefore(noteEl,btnEl);

    notes.push(noteObj);

    saveNotes(notes);
}

function saveNotes(note)
{
    localStorage.setItem('note',JSON.stringify(note))
}

function getNotes()
{
    return JSON.parse(localStorage.getItem('note') || '[]');
}

btnEl.addEventListener('click',addNote);