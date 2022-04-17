//Variables---------------------------------------------------------------------

//Container and Panels
let btnAddNotePanel = document.getElementById("btnAddNotePanel");
let closeNoteX = document.getElementById("closeNoteX");
let containerNotePanel = document.getElementById("containerNotePanel");
let contNotesEmpty = document.querySelector(".contNotesEmpty");

//Notes
let allNotes = document.querySelectorAll(".noteBox");
let notePinned = document.getElementById("notePinned"); //PinNote
let deleteBtnNote = document.querySelectorAll(".deleteBtnNote");

//Selecting values from the user Panel Create or Edit
let contPinAndXPanel = document.querySelector("contPinAndXPanel");
let pinNoteIconPanel = document.getElementById("pinNoteIconPanel");
let noteIdPanel = document.getElementById("noteIdPanel");
let noteTitle = document.getElementById("noteTitle");
let noteDescr = document.getElementById("noteDescr");
let noteTimePanel = document.getElementById("noteTimePanel");
let checkBoxPin = document.getElementById("checkBoxPin");
let createBtnPanel = document.getElementById("createBtnPanel");
let editBtnPanel = document.getElementById("editBtnPanel");

//Calling functions--------------------------------------------------------------

loadPinsDesign();
showEmptyNote();

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
    if (checkBoxPin.checked)
    {
        checkBoxPin.value = true;

    } 
    else
    {
        checkBoxPin.value = false;
    } 
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

    if (pinned == "True") {
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

function showEmptyNote()
{
    if (allNotes.length === 0) {
        contNotesEmpty.style.display = "flex";
    }
    else
    {
        contNotesEmpty.style.display = "none";
    }
}

//Event listeners--------------------------------------------------------------

//editNote when clicking
allNotes.forEach(note => note.addEventListener("click", (e) =>
{
    if (e.target.className !== "deleteBtnNote")
    {
        editNote(note);
    } 
}));

//To not fire editPanel when clicking delete
deleteBtnNote.forEach(btn => btn.addEventListener("click", (e) => e.stopPropagation()));

//To change the value of the checkbox
checkBoxPin.addEventListener("click", checkedPinValue);

btnAddNotePanel.addEventListener("click", openCreateNotePanel);

closeNoteX.addEventListener("click", closeCreateNotePanel);

//Time hour create panel
setInterval(() => {
    let today = new Date();
    let nday = String(today.getDate());
    let hh = String(today.getHours());
    let mm = String(today.getMinutes());
    let month = [];

    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";


    today = month[today.getMonth()] + " " + nday + ", " + hh + ':' + mm;

    noteTimePanel.innerHTML = today;

}, 1000);