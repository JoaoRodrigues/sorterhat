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
    
    let datebox = document.querySelector(".datebox");
    datebox.innerHTML = today.toLocaleDateString("en-US", date_options)

    // simplify group picking on day since epoch being even/odd
    let d_since_epoch = Math.floor(today.getTime() / (1000 * 86400))  // ms to s to days
    let is_odd = (d_since_epoch % 2 > 0);
    let grp_ix =  (is_odd ? 1: 2);

    let today_grp = Object.keys(people).filter(o => people[o] === grp_ix)

    // reverse order every other day
    if ((d_since_epoch + is_odd) % 4 == 0) {
        today_grp.reverse()
    }

    tg.push("Em"); // Always add The Boss at the end.
    
    for (i = 0; i < today_grp.length; i++) {
        createBox(today_grp[i], colors[i]);
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


