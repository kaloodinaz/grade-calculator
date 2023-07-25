// Initial variables
var rowCount = 1;

// function initAccordion() {
//     var acc = document.getElementsByClassName("accordion");

//     for (var i = 0; i < acc.length; i++) {
//         acc[i].addEventListener("click", function () {
//             this.classList.toggle("active");
//             var panel = this.nextElementSibling;
//             if (panel.style.maxHeight) {
//                 panel.style.maxHeight = null;
//             } else {
//                 panel.style.maxHeight = panel.scrollHeight + "px";
//             }
//         });
//     }
// }

function addRow(holderName, holderGrade, holderWeight) {
    var container = document.getElementById("container");

    // Create a unique form 
    rowCount++;
    var form = document.createElement("form");
    form.className = "row";
    form.setAttribute("id", "row" + rowCount);

    // Divs
    var nameDiv = document.createElement("div");
    nameDiv.className = "col name";

    var gradeDiv = document.createElement("div");
    gradeDiv.className = "col num";

    var weightDiv = document.createElement("div");
    weightDiv.className = "col num";

    // Create the input elements
    var nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.className = "selectable";
    nameInput.id = "name";
    if (holderName != undefined) {  // if there is a value
        nameInput.placeholder = holderName;
    }

    nameDiv.appendChild(nameInput);
    form.appendChild(nameDiv);

    var gradeInput = document.createElement("input");
    gradeInput.type = "number";
    gradeInput.className = "selectable";
    gradeInput.id = "grade";
    if (holderGrade != undefined) {  // if there is a value
        gradeInput.placeholder = holderGrade;
    }

    gradeDiv.appendChild(gradeInput);
    form.appendChild(gradeDiv);

    var weightInput = document.createElement("input");
    weightInput.type = "number";
    weightInput.className = "selectable";
    weightInput.id = "weight";
    if (holderWeight != undefined) {  // if there is a value
        weightInput.placeholder = holderWeight;
    }

    weightDiv.appendChild(weightInput);
    form.appendChild(weightDiv);

    // form.appendChild();
    // form.appendChild();
    // form.appendChild();

    // Append the new row to the container
    container.appendChild(form);
}

function initRows() {
    addRow("", "", "");
    addRow("", "", "");
    addRow("", "", "");
}

function resetFinalGrade() {
    var currentGrade = document.getElementById("currentGrade");
    currentGrade.value = "";

    var targetGrade = document.getElementById("targetGrade");
    targetGrade.value = "";

    var finalExamWeight = document.getElementById("finalExamWeight");
    finalExamWeight.value = "";
}

function resetRows() {
    var container = document.getElementById("container");
    var firstRow = document.getElementById("row1");
    firstRow.reset();

    for (var i = rowCount; i > 1; i--) {
        var row = document.getElementById(`row${i}`);
        container.removeChild(row);
        rowCount--;
    }

    initRows();
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
    // var letterGrade = findLetterGrade(average);

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
        requiredGrade = Math.round(requiredGrade * 100) / 100;
        optionalOutput.innerHTML = `<p>You need to score an average of <span class=\"highlight_num\">${requiredGrade}%</span> for the remaining <span class=\"highlight_num\">${rWeight}%</span> to end with <span class=\"highlight_num\">${desiredGrade}%</span> in your class.</p>`;
    }
}

function isNegative(a, b, c, d) {
    if (a < 0 || b < 0 || c < 0 || d < 0) {
        return true;
    } else {
        return false;
    }
}

function calcFinalGrade() {
    var finalGradeOutput = document.getElementById('finalGradeOutput');
    finalGradeOutput.innerHTML = "";

    var currentGradeInput = document.getElementById("currentGrade");
    var currentGrade = Math.round(currentGradeInput.value * 100) / 100;

    var targetGradeInput = document.getElementById("targetGrade");
    var targetGrade = Math.round(targetGradeInput.value * 100) / 100;

    var finalExamWeightInput = document.getElementById("finalExamWeight");
    var finalExamWeight = Math.round(finalExamWeightInput.value * 100) / 100;

    if (currentGrade < 0 || currentGrade > 100 || targetGrade < 0 || targetGrade > 100 || finalExamWeight < 0 || finalExamWeight >= 100) {
        alert("Final Grade Calculator error. Check for the following:\n\n\u2022 Negative numbers (-)\n\u2022 Values over 100\n\u2022 Exponent symbols (\"e\" or \"E\")\n\u2022 Blank entries");
        return;
    }

    var requiredGrade = (targetGrade - (currentGrade*((100-finalExamWeight)/100))) / ((finalExamWeight)/100);
    requiredGrade = Math.round(requiredGrade * 100) / 100;

    finalGradeOutput.innerHTML = `<p>You need to score an average of <span class=\"highlight_num\">${requiredGrade}%</span> to end with <span class=\"highlight_num\">${targetGrade}%</span> in your class.</p>`;
}

function calcCurrentGrade() {
    var average = 0;
    var totalWeight = 0;

    for (var i = 1; i <= rowCount; i++) {
        var form = document.getElementById("row" + i);

        var gradeInput = form.querySelector("#grade");
        var grade = parseFloat(gradeInput.value);   // grade value

        var weightInput = form.querySelector("#weight");
        var weight = parseFloat(weightInput.value); // weight value

        // If either inputs are left blank, then skip reading this row
        if (isNaN(grade) || isNaN(weight))
            continue;

        // Rounding these values to 2 decimal places
        grade = Math.round(grade * 100) / 100;
        weight = Math.round(weight * 100) / 100;

        average = average + (grade * (weight / 100));
        average = Math.round(average * 100) / 100;

        totalWeight = totalWeight + weight;
        totalWeight = Math.round(totalWeight * 100) / 100;

        if (totalWeight > 100 || isNegative(grade, weight, average, totalWeight)) {
            alert("Current Grade Calculator error. Check for the following:\n\n\u2022 Negative numbers (-)\n\u2022 Values over 100\n\u2022 Exponent symbols (\"e\" or \"E\")");
            return;
        }
    }

    if (average == 0 && totalWeight == 0) return;

    writeOutput(average, totalWeight);

    var desiredGradeInput = document.getElementById("desiredGrade");
    var desiredGrade = desiredGradeInput.value;
    if (desiredGrade.trim() != "") {
        writeOptionalOutput(average, totalWeight, desiredGrade);
    }
}

if (localStorage.getItem("darkMode") === null) {
    localStorage.setItem("darkMode", "true");
}

function applyDarkTheme() {
    const bodyElement = document.body;
    const contentWrapper = document.querySelectorAll('.content_wrapper');
    const pElement = document.querySelectorAll('p');
    const h2Element = document.querySelectorAll('h2');
    const labelElement = document.querySelectorAll('label');
    const addRowBtn = document.querySelector('#addRowBtn');
    const toggleStatus = document.querySelector('#toggleStatus');

    bodyElement.style.backgroundColor = "rgb(30, 30, 30)";
    contentWrapper.forEach(wrapper => {
        wrapper.style.backgroundColor = "rgb(45, 45, 45)";
    });
    pElement.forEach(p => {
        p.style.color = "white";
    });
    h2Element.forEach(h2 => {
        h2.style.color = "white";
    });
    labelElement.forEach(label => {
        label.style.color = "white";
    });
    addRowBtn.style.color = "white";

    toggleStatus.style.backgroundColor = "rgb(21, 9, 73)";
    toggleStatus.style.color = "white";
    toggleStatus.textContent = "Dark Mode: ON";
}

function applyLightTheme() {
    const bodyElement = document.body;
    const contentWrapper = document.querySelectorAll('.content_wrapper');
    const pElement = document.querySelectorAll('p');
    const h2Element = document.querySelectorAll('h2');
    const labelElement = document.querySelectorAll('label');
    const addRowBtn = document.querySelector('#addRowBtn');
    const toggleStatus = document.querySelector('#toggleStatus');

    bodyElement.style.backgroundColor = "rgb(255, 255, 255)";
    contentWrapper.forEach(wrapper => {
        wrapper.style.backgroundColor = "rgb(200, 200, 200)";
    });
    pElement.forEach(p => {
        p.style.color = "black";
    });
    h2Element.forEach(h2 => {
        h2.style.color = "black";
    });
    labelElement.forEach(label => {
        label.style.color = "black";
    });
    addRowBtn.style.color = "black";

    toggleStatus.style.backgroundColor = "rgb(251, 209, 211)";
    toggleStatus.style.color = "black";
    toggleStatus.textContent = "Dark Mode: OFF";
}

function initToggle() {
    if (JSON.parse(localStorage.getItem("darkMode"))) {
        applyDarkTheme();
        
    } else {
        applyLightTheme();
    }
}

function toggleDark() {
    let darkModeValue = JSON.parse(localStorage.getItem("darkMode"));
    darkModeValue = !darkModeValue; // Toggle the value (if it was true, now it becomes false, and vice versa)
    localStorage.setItem("darkMode", JSON.stringify(darkModeValue)); // Save the updated value in localStorage
    
    initToggle();
}

// Initialization
// initAccordion();
initRows();
initToggle();