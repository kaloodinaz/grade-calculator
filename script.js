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

function addRow(holderName, holderGrade, holderWeight) {
    var container = document.getElementById("container");

    // Create a unique form 
    rowCount++;
    var form = document.createElement("form");
    form.className = "row";
    form.setAttribute("id", "row" + rowCount);

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
    gradeInput.id = "grade";
    gradeInput.className = "numInput";
    gradeInput.name = "number[]";
    if (holderGrade != undefined) {  // if there is a value
        gradeInput.placeholder = holderGrade;
    }

    var weightInput = document.createElement("input");
    weightInput.type = "number";
    weightInput.id = "weight";
    weightInput.className = "numInput";
    weightInput.name = "number[]";
    if (holderWeight != undefined) {  // if there is a value
        weightInput.placeholder = holderWeight;
    }

    form.appendChild(nameInput);
    form.appendChild(gradeInput);
    form.appendChild(weightInput);

    // Append the new row to the container
    container.appendChild(form);
}

function calcCurrentGrade() {
    var average = 0;
    var totalWeight = 0;

    for(var i = 0; i <= rowCount; i++) {
        var form = document.getElementById("row" + i);

        var gradeInput = form.querySelector("#grade");
        var grade = parseFloat(gradeInput.value);
        
        var weightInput = form.querySelector("#weight");
        var weight = parseFloat(weightInput.value);       

        if (isNaN(grade) || isNaN(weight))
            continue;

        // Perform Calculations
        average = average + (grade*(weight/100));
        totalWeight = totalWeight + weight;
    }
    
    console.log(`Average of ${average} and \n combined weight of ${totalWeight}`);
}

addRow("Assignment 2", "80", "12.5");
addRow("Midterm", "77", "25");
addRow("Assignment 3", "89", "15");