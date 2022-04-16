//Variables---------------------------------------------------------------------

//Container and Panels
let contTxtAddNote = document.getElementById("contTxtAddNote");
let closeNoteX = document.getElementById("closeNoteX");
let containerNotePanel = document.getElementById("containerNotePanel");

//Notes
let allNotes = document.querySelectorAll(".noteBox");
let notePinned = document.getElementById("notePinned"); //PinNote

//Selecting values from the user Panel Create or Edit
let noteIdPanel = document.getElementById("noteIdPanel");
let noteTitle = document.getElementById("noteTitle");
let noteDescr = document.getElementById("noteDescr");
let checkBoxPin = document.getElementById("checkBoxPin");
let createBtnPanel = document.getElementById("createBtnPanel");
let editBtnPanel = document.getElementById("editBtnPanel");

//Calling functions--------------------------------------------------------------

loadPinsDesign();

//Functions

function loadPinsDesign()
{
    for (let i = 0; i < allNotes.length; i++) {

        let valuePinNote = allNotes[i].querySelector(".noteSelected");
        let pinNote = allNotes[i].querySelector(".notePinned");

        if (valuePinNote.textContent == "True") {
            pinNote.style.display = "flex";
        }
        else {
            pinNote.style.display = "none";
        }
    }
}

function resetParametersPanel()
{
    noteIdPanel.textContent = "";
    noteTitle.value = "";
    noteDescr.value = "";
    checkBoxPin.checked = false;
    checkBoxPin.value = false;
}

function openCreateNotePanel()
{
    resetParametersPanel();

    editBtnPanel.style.display = "none";
    createBtnPanel.style.display = "flex";
    
    containerNotePanel.style.display = "flex";
}

function closeCreateNotePanel()
{
    containerNotePanel.style.display = "none";

    resetParametersPanel();

    editBtnPanel.style.display = "none";
}

function checkedPinValue()
{
    checkBoxPin.checked ? checkBoxPin.value = true : checkBoxPin.value = false;
}

function editNote(item) {

    //Saving note info to variables
    const id = item.querySelector(".noteId").textContent;
    const title = item.querySelector(".noteTitle").querySelector("h2").textContent;
    const descr = item.querySelector(".noteDescr").querySelector("p").textContent;
    const pinned = item.querySelector(".noteSelected").textContent;

    //Moving the info to the panel
    noteIdPanel.value = id;
    noteTitle.value = title;
    noteDescr.value = descr;

    if (pinned == "True") {noteIdPanel
        checkBoxPin.checked = true;
        checkBoxPin.value = true;
    }
    else
    {
        checkBoxPin.checked = false;
        checkBoxPin.value = false;
    }

    createBtnPanel.style.display = "none";
    editBtnPanel.style.display = "flex";

    //Opening the notePanel
    containerNotePanel.style.display = "flex";
}

//Event listeners--------------------------------------------------------------

//editNote when clicking
allNotes.forEach(note => note.addEventListener("click", editNote.bind(null, note), false));

//deleteNote when clicking

//To change the value of the checkbox
checkBoxPin.addEventListener("click", checkedPinValue);

contTxtAddNote.addEventListener("click", openCreateNotePanel);

closeNoteX.addEventListener("click", closeCreateNotePanel);