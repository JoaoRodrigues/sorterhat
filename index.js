const people = {
    "Hh": 1,
    "Mg": 1,
    "Tx": 1,
    "Lz": 1,
    "Gr": 1,
    "Dk": 1,
    "Jr": 2,
    "Jt": 2,
    "Dc": 2,
    "Ml": 2,
    "Ty": 2,
}

const pallette = [
    "#f94144",
    "#f3722c",
    "#f8961e",
    "#f9844a",
    "#f9c74f",
    "#90be6d",
    "#43aa8b",
    "#4d908e",
    "#577590",
    "#277da1",
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

    // Add Pd last on every Tue
    let dayOfWeek = today.getDay();
    if (dayOfWeek === 2) {
        today_grp.push("Pd");
    }

    today_grp.unshift("Em"); // Always add The Boss first.

    for (i = 0; i < today_grp.length; i++) {
        createBox(today_grp[i], colors[i]);
    }
}

// Functions
function createBox(name, bgcolor) {
    let div = document.createElement("div");
    div.id = "box-" + name;
    div.classList.add("box");
    div.style.backgroundColor = bgcolor;
    localStorage.setItem(div.id + "-bgcolor", bgcolor);

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

const gray = "#dcdcdc"

// Robust way of comparing colors
function isElementBGColor(el, color) {
  const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  ctx.fillStyle = color;
  ctx.fillRect( 0, 0, 1, 1 );
  ctx.fillStyle = getComputedStyle(el, null).getPropertyValue("background-color");
  ctx.fillRect( 1, 0, 1, 1 );
  const a = JSON.stringify(Array.from(ctx.getImageData(0, 0, 1, 1).data));
  const b = JSON.stringify(Array.from(ctx.getImageData(1, 0, 1, 1).data));
  ctx.canvas = null;
  return a === b;
}

document.addEventListener("click", function(e) {
  const target = e.target.closest(".box");
  if (target) {
    if (!isElementBGColor(target, gray)) {
        target.style.backgroundColor = gray;
    } else {
        boxColor = localStorage.getItem(target.id + "-bgcolor");
        target.style.backgroundColor = boxColor;
    }
  }
});
