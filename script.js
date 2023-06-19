var rowCount = 0;

var acc = document.getElementsByClassName("accordion");

for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

function calcCurrentGrade() {
    
}

function addRow(holderName, holderGrade, holderWeight) {
    var container = document.getElementById("container");

    // Create a unique form 
    rowCount++;
    var form = document.createElement("form");
    form.className = "row";
    var formId = "row"+rowCount;
    form.setAttribute("id", formId);

    // Create the input elements
    var nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "name";
    nameInput.name = "textbox[]";
    if(holderName != undefined) {  // if there is a value
        nameInput.placeholder = "ex. "+holderName;   
    }

    var gradeInput = document.createElement("input");
    gradeInput.type = "number";
    gradeInput.className = "numInput";
    gradeInput.name = "number[]";
    if (holderGrade != undefined) {  // if there is a value
        gradeInput.placeholder = holderGrade;
    }

    var weightInput = document.createElement("input");
    weightInput.type = "number";
    weightInput.className = "numInput";
    weightInput.name = "number[]";
    if (holderWeight != undefined) {  // if there is a value
        weightInput.placeholder = holderWeight;
    }

    // Append the input elements to the new row
    form.appendChild(nameInput);
    form.appendChild(gradeInput);
    form.appendChild(weightInput);

    // Insert the row into a form

    // Append the new row to the container
    container.appendChild(form);
}

addRow("Assignment 2", "80", "12.5");
addRow("Midterm", "77", "25");
addRow("Assignment 3", "89", "15");