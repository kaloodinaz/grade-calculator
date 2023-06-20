var rowCount = 1;

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
    if (holderName != undefined) {  // if there is a value
        nameInput.placeholder = "ex. " + holderName;
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

function initAccordion() {
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
}

function initRows() {
    addRow("Assignment 2", "80", "12.5");
    addRow("Midterm", "77", "25");
    addRow("Assignment 3", "89", "15");
}

function findLetterGrade(average) {
    if (average >= 95)
        return "A+";
    else if (average >= 87 && average <= 94)
        return "A";
    else if (average >= 80 && average <= 86)
        return "A-";
    else if (average >= 77 && average <= 79)
        return "B+";
    else if (average >= 72 && average <= 76)
        return "B";
    else if (average >= 70 && average <= 71)
        return "B-";
    else if (average >= 67 && average <= 69)
        return "C+";
    else if (average >= 63 && average <= 66)
        return "C";
    else if (average >= 60 && average <= 62)
        return "C-";
    else if (average >= 57 && average <= 59)
        return "D+";
    else if (average >= 54 && average <= 56)
        return "D";
    else if (average >= 51 && average <= 53)
        return "D-";
    else
        return "F";
}

function writeOutput(average, weight) {
    var letterGrade = findLetterGrade(average);

    // Retrieve the input elements
    var outputGradeInput = document.getElementById("outputGrade");
    outputGradeInput.value = average;

    var outputWeightInput = document.getElementById("outputWeight");
    outputWeightInput.value = weight;

    var optionalOutput = document.getElementById("optionalGrade");
    optionalOutput.innerHTML = "";
}

function writeOptionalOutput(average, weight, desiredGrade) {
    var optionalOutput = document.getElementById("optionalGrade");
    optionalOutput.innerHTML = "";

    if (weight < 100) {
        var rWeight = 100 - weight;
        var requiredGrade = (desiredGrade - average) / (rWeight / 100);
        optionalOutput.innerHTML = `<p>You need to score an average of <span class=\"highlight_num\">${requiredGrade}%</span> for the remaining ${rWeight}% to end with ${desiredGrade}% in your class.</p>`;
    }
}

function calcCurrentGrade() {
    var average = 0;
    var totalWeight = 0;

    for (var i = 1; i <= rowCount; i++) {
        var form = document.getElementById("row" + i);

        var gradeInput = form.querySelector("#grade");
        var grade = parseFloat(gradeInput.value);

        var weightInput = form.querySelector("#weight");
        var weight = parseFloat(weightInput.value);

        if (isNaN(grade) || isNaN(weight))
            continue;

        average = average + (grade * (weight / 100));
        totalWeight = totalWeight + weight;
    }

    if (average == 0 && totalWeight == 0) return;

    writeOutput(average, totalWeight);

    var desiredGradeInput = document.getElementById("desiredGrade");
    var desiredGrade = desiredGradeInput.value;
    if (desiredGrade.trim() != "") {
        writeOptionalOutput(average, totalWeight, desiredGrade);
    }
}

// Initialization
initAccordion();
initRows();