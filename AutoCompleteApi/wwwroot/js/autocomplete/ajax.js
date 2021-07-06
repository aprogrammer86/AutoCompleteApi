"use strict";

let inputText;
let resultPlace;
let resultNumberPlace;
let resultNumber;
let currentNumber = 0;
let timer;

let resultArray = new Array();
let focus = -1;

function Tick() {

    if (Math.abs(currentNumber - resultNumber) < 1) {
        currentNumber = resultNumber;
        clearInterval(timer);
    }
    else {
        currentNumber = (currentNumber * 0.8) + (resultNumber * 0.2);
    }

    resultNumberPlace.innerHTML = currentNumber.toFixed().toString().padStart(4, "0");

}

function HandleInput(sender) {

    inputText = sender.querySelector("#inputText");
    resultPlace = sender.querySelector("#resultPlace");
    resultNumberPlace = resultPlace.querySelector("#resultNumber");
    let data =
    {
        Id: inputText.id,
        UserText: inputText.value
    };

    CloseList();
    handleAjaxJson("POST", "/Home/ResultCandidates", true, CreateAutoCompleteList, data);

}

function CreateAutoCompleteList(result) {
    resultArray = result.resultCandidates;    

    if (resultArray != null) {

        let container = document.createElement("div");
        container.setAttribute("class", "autocomplete-items");
        container.setAttribute("id", inputText.id + "autocomplete-items");
        inputText.parentNode.appendChild(container);

        for (let element of resultArray) {
            let item = document.createElement("div");
            item.innerHTML = element;
            item.innerHTML += "<input type='hidden' value='" + element + "'>";
            container.appendChild(item);
        }

        resultNumber = resultArray.length;
    }
    else {
        resultNumber = 0;
    }
    timer = setInterval(Tick, 40);
}

function DataLogger(result) {
    console.log("DataLogger");
    console.log(result);
    for (p of result.resultCandidates) {
        console.log(p);
    }

}
function CreateResultTable(result) {

    let list = resultPlace.childNodes;
    for (let p of list) {
        p.remove();
    }

    let table = document.createElement("table");
    table.style.textTransform = "capitalize";
    //resultDiv.appendChild(table);
    resultPlace.appendChild(table);
    for (let prop in result) {
        let row = table.insertRow();
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();

        cell1.innerHTML = prop;
        cell2.style.textAlign = "center";
        cell2.innerHTML = result[prop];
    }
}

function handleAjaxJson(method, url, asyncFlag, callback, data) {
    let xHttp = new XMLHttpRequest();

    xHttp.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            callback(JSON.parse(this.responseText));
        }
    }
    xHttp.open(method, url, asyncFlag);
    xHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xHttp.send(JSON.stringify(data));
}

function CloseList() {

    if (resultArray == null)
        return -1;

    focus = -1;
    resultArray.length = 0;

    let list = inputText.parentNode.getElementsByClassName("autocomplete-items");

    for (let i = 0; i < list.length; i++) {
        list[i].remove();
    }
}


function HandleKeyPress(sender) {
    const UpArrowKey = 38;
    const DownArrowKey = 40;
    const EnterKey = 13;
    const BackspaceKey = 8;
    const DeleteKey = 46;
    const EscapeKey = 27;

    inputText = sender.querySelector("#inputText");
    resultPlace = sender.querySelector("#resultPlace");

    if (resultArray == null)
        return -1;

    let key = event.key;
    let whichKey = event.which;
    let len = resultArray.length;
    let maxIndex = len - 1;

    if (IsImportantKey(whichKey)) {

        event.preventDefault();

        if (len > 0) {
            if (whichKey == EscapeKey) {
                CloseList();
            }
            else {
                if (whichKey == UpArrowKey) {
                    focus--;
                }
                else if (whichKey == DownArrowKey) {
                    focus++;
                }

                focus = focus > maxIndex ? 0 : focus;
                focus = focus < 0 ? maxIndex : focus;

                inputText.value = resultArray[focus];

                let list = inputText.parentNode.getElementsByClassName("autocomplete-items")[0].childNodes;

                for (let i = 0; i < list.length; i++) {
                    list[i].classList.remove("autocomplete-active");
                }
                list[focus].classList.add("autocomplete-active");

            }
        }
    }
}

function IsImportantKey(key) {
    const UpArrowKey = 38;
    const DownArrowKey = 40;
    const EnterKey = 13;
    const EscapeKey = 27;

    return key == UpArrowKey || key == DownArrowKey || key == EnterKey || key == EscapeKey;
}