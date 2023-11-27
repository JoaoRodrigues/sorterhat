const people = {
    "Hh": 1,
    "Jr": 1,
    "Mg": 1,
    "Tx": 1,
    "Dc": 2,
    "Pd": 2,
    "Ml": 2,
    "Ty": 2,
    "Ak": 2,
}

const pallette = [
    "#F94144",
    "#F3722C",
    "#F8961E",
    "#F9C74F",
    "#90BE6D",
    "#43AA8B",
    "#4D908E",
    "#577590",
]

const colors = getRandomSample(pallette, Object.keys(people).length);

const date_options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

// Main
window.onload = function sorter() {
    let today = new Date(); // UTC
    let wkday = today.getDay(); // Sun=0
    let moday = today.getDate();

    let datebox = document.querySelector(".datebox");
    datebox.innerHTML = today.toLocaleDateString("en-US", date_options)

    let g = (moday % 2 > 0) ? 1: 2;

    let tg = Object.keys(people).filter(o => people[o] === g)

    if (wkday % 2 === 0) {  // revert on Tue/Thu
        tg.reverse()
    }

    tg.push("Em"); // Always add The Boss at the end.
    
    for (i = 0; i < tg.length; i++) {
        createBox(tg[i], colors[i]);
    }
}

// Functions
function createBox(name, bgcolor) {
    let div = document.createElement("div");
    div.classList.add("box");
    div.style.backgroundColor = bgcolor;

    div.innerHTML = name;
    document.querySelector(".box-container").appendChild(div);
}


function getRandomSample(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}


