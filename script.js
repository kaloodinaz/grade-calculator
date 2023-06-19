var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
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

function addRow(holderName) {
    var container = document.getElementById("container");

    // Create a new row div
    var newRow = document.createElement("div");
    newRow.className = "row";

    // Create the input elements
    var nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "textbox[]";
    if(holderName != "") {  // if there is a value
     nameInput.placeholder = "ex. "+holderName;   
    }
    nameInput.className = "input_name";

    var gradeInput = document.createElement("input");
    gradeInput.type = "number";
    gradeInput.name = "number[]";
    gradeInput.className = "input_grade";

    var weightInput = document.createElement("input");
    weightInput.type = "number";
    weightInput.name = "number[]";
    weightInput.className = "input_weight";

    // Append the input elements to the new row
    newRow.appendChild(nameInput);
    newRow.appendChild(gradeInput);
    newRow.appendChild(weightInput);

    // Append the new row to the container
    container.appendChild(newRow);
}

addRow("Assignment 2");
addRow("Midterm");
addRow("Assignment 3");