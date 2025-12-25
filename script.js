let body = document.querySelector("body");
let boxes = document.querySelectorAll("button");
let time = document.querySelector(".time")

let up = new Set([1, 2, 3, 4, 5]);
let right = new Set([13, 20, 27, 34, 41, 48, 55, 62]);
let left = new Set([7, 14, 21, 28, 35, 42, 49, 56]);
let down = new Set([64, 65, 66, 67, 68]);
let numbers = [];
let numSet = new Set();
let blank = new Set();
let border = new Set();
let counts = {};
let timer = true;

// colouring game board
for (let i = 0; i <= 69; i += 2) {
    boxes[i].style.backgroundColor = "#A1FCDF"
    boxes[i + 1].style.backgroundColor = "#7FD8BE"
}


// generate random numbers(number of boxes) to place the bomb there
function bomb() {
    do {
        let bomb = Math.floor(Math.random() * 69);
        bombSet.add(bomb);
    } while (bombSet.size <= 7);
}
let bombSet = new Set();
bomb();
let bombArr = Array.from(bombSet);


// placing bomb at the numbers that are generated above
function bombGenerator() {
    // pushing index of boxes which are around bomb in numbers array
    for (let j = 0; j <= 8; j++) {
        if (right.has(bombArr[j])) {
            numbers.push(bombArr[j] - 1, bombArr[j] + 7, bombArr[j] - 7, bombArr[j] + 6, bombArr[j] - 8);
        } else if (left.has(bombArr[j])) {
            numbers.push(bombArr[j] + 1, bombArr[j] + 7, bombArr[j] - 7, bombArr[j] - 6, bombArr[j] + 8)
        } else if (up.has(bombArr[j])) {
            numbers.push(bombArr[j] - 1, bombArr[j] + 1, bombArr[j] + 7, bombArr[j] + 6, bombArr[j] + 8)
        } else if (down.has(bombArr[j])) {
            numbers.push(bombArr[j] - 1, bombArr[j] + 1, bombArr[j] - 7, bombArr[j] - 6, bombArr[j] - 8)
        } else if (bombArr[j] == 0) {
            numbers.push(bombArr[j] + 1, bombArr[j] + 7, bombArr[j] + 8)
        } else if (bombArr[j] == 6) {
            numbers.push(bombArr[j] - 1, bombArr[j] + 7, bombArr[j] + 6)
        } else if (bombArr[j] == 63) {
            numbers.push(bombArr[j] + 1, bombArr[j] - 7, bombArr[j] - 6)
        } else if (bombArr[j] == 69) {
            numbers.push(bombArr[j] - 1, bombArr[j] - 7, bombArr[j] - 8)
        } else {
            numbers.push(bombArr[j] - 1, bombArr[j] + 1, bombArr[j] - 7, bombArr[j] + 7, bombArr[j] - 8, bombArr[j] + 8, bombArr[j] + 6, bombArr[j] - 6)
        }
    }
}


// displaying all the numbers around boxes by counting them and colouring boxes
function display() {
    let borderArr = Array.from(border);

    // colour function display numbers of boxes and color them
    let colour = (i, k) => {
        boxes[borderArr[i] + k].style.backgroundColor = "rgb(139, 134, 134)";
        boxes[borderArr[i] + k].innerText = counts[borderArr[i] + k];
        boxes[borderArr[i] + k].disabled = true;
    }


    let count = 0;
    // removing index of box that are bomb
    for (let i = 0; i < bombArr.length; i++) {
        if (numbers.includes(bombArr[i])) {
            numbers.splice(numbers.indexOf(bombArr[i]), 1);
            if (numbers.includes(bombArr[i])) {
            numbers.splice(numbers.indexOf(bombArr[i]), 1);
            if (numbers.includes(bombArr[i])) {
            numbers.splice(numbers.indexOf(bombArr[i]), 1);
            }
            }
        }
    }

    // counting repetation of index of boxes in numbers array to display number around bomb
    // storing it in dictionary(object) of counts
    for (let l = 0; l <= numbers.length - 1; l++) {
        for (let m = 0; m <= numbers.length - 1; m++) {
            if (numbers[l] == numbers[m]) {
                count += 1;
            }
        }
        counts[numbers[l]] = count;
        count = 0;
    }

    // if there are any number in border array then show number of box
    // and removing that element from border array
    for (let i = 0; i < borderArr.length; i++) {
        if (numbers.includes(borderArr[i])) {
            colour(i, 0)
            borderArr.splice(i, 1);
        }
    }

    // if border array consist any border box, then remove it
    for (let i = 0; i < borderArr.length; i++) {
        if (up.has(borderArr[i])) {
            borderArr.splice(i, 1);
        }
        if (down.has(borderArr[i])) {
            borderArr.splice(i, 1);
        }
        if (right.has(borderArr[i])) {
            borderArr.splice(i, 1);
        }
        if (left.has(borderArr[i])) {
            borderArr.splice(i, 1);
        }
        if (borderArr[i] == 0) {
            borderArr.splice(i, 1);
        }
        if (borderArr[i] == 6) {
            borderArr.splice(i, 1);
        }
        if (borderArr[i] == 63) {
            borderArr.splice(i, 1);
        }
        if (borderArr[i] == 69) {
            borderArr.splice(i, 1);
        }
    }

    // coloring and numbering all the boxes around elements of border array
    for (let i = 0; i < borderArr.length; i++) {
        if (numbers.includes(borderArr[i] + 1)) {
            colour(i, 1);
        }
        if (numbers.includes(borderArr[i] + 6)) {
            colour(i, 6);
        }
        if (numbers.includes(borderArr[i] + 7)) {
            colour(i, 7);
        }
        if (numbers.includes(borderArr[i] + 8)) {
            colour(i, 8);
        }
        if (numbers.includes(borderArr[i] - 1)) {
            colour(i, -1);
        }
        if (numbers.includes(borderArr[i] - 6)) {
            colour(i, -6);
        }
        if (numbers.includes(borderArr[i] - 7)) {
            colour(i, -7);
        }
        if (numbers.includes(borderArr[i] - 8)) {
            colour(i, -8);
        }
    }

    for (let k = 0; k <= 5; k++) {
        if (bombArr[k] % 2 == 0) {
            boxes[bombArr[k]].style.backgroundColor = "#A1FCDF"
        } else {
            boxes[bombArr[k]].style.backgroundColor = "#7FD8BE"
        }
        boxes[bombArr[k]].disabled = false
        boxes[bombArr[k]].innerText = null
    }
}


// recreating all interface
function regenerate() {
    for (let i = 0; i <= 69; i++) {
        boxes[i].style.backgroundColor = "";
        boxes[i].innerText = "";
    }
    for (let i = 0; i <= 69; i += 2) {
        boxes[i].style.backgroundColor = "#A1FCDF"
        boxes[i + 1].style.backgroundColor = "#7FD8BE"
    }
    numbers.length = 0;
    bombSet.clear();
    numSet.clear();
    bomb();
    bombArr = Array.from(bombSet);
    bombGenerator();
    for (let i of blank) {
        if (bombArr.includes(i)) {
            regenerate();
        }
    }
    // console.log(bombArr)
    // console.log("number 2", numbers)
}


function blanking(i) {
    // console.log(i)
    // inserting index of boxes that are around cliked box when start the game
    if (right.has(i)) {
        blank.add(i);
        blank.add(i - 1);
        blank.add(i - 7);
        blank.add(i - 8);
        blank.add(i + 7);
        blank.add(i + 6);
    } else if (left.has(i)) {
        blank.add(i);
        blank.add(i - 7);
        blank.add(i - 6);
        blank.add(i + 8);
        blank.add(i + 7);
        blank.add(i + 1);
    } else if (up.has(i)) {
        blank.add(i);
        blank.add(i - 1);
        blank.add(i + 8);
        blank.add(i + 7);
        blank.add(i + 6);
        blank.add(i + 1);
    } else if (down.has(i)) {
        blank.add(i);
        blank.add(i - 1);
        blank.add(i - 7);
        blank.add(i - 6);
        blank.add(i - 8);
        blank.add(i + 1);
    } else if (i == 0) {
        blank.add(i);
        blank.add(i + 1);
        blank.add(i + 7);
        blank.add(i + 8);
    } else if (i == 6) {
        blank.add(i);
        blank.add(i - 1);
        blank.add(i + 7);
        blank.add(i + 6);
    } else if (i == 63) {
        blank.add(i);
        blank.add(i + 1);
        blank.add(i - 7);
        blank.add(i - 6);
    } else if (i == 69) {
        blank.add(i);
        blank.add(i - 1);
        blank.add(i - 7);
        blank.add(i - 8);
    } else {
        blank.add(i);
        blank.add(i - 1);
        blank.add(i - 7);
        blank.add(i - 6);
        blank.add(i - 8);
        blank.add(i + 8);
        blank.add(i + 7);
        blank.add(i + 6);
        blank.add(i + 1);
    }

    // if around the cliked box at start there is bomb then regenerating all the 
    // interface again including position of bomb
    for (let i of blank) {
        if (bombArr.includes(i)) {
            regenerate();
        }
    }

    // all the while loop below are used to create blank boxes when user click
    // first time, we insert index of boxes vertically and horizontally in blank set
    let c = i;
    // while for horizontal left
    while (!bombArr.includes(c - 1) && !bombArr.includes(c + 6) && !bombArr.includes(c - 8)) {
        if (left.has(c) || c == 0 || c == 63) {
            break;
        }
        blank.add(c + 6);
        blank.add(c - 8);
        blank.add(c - 1);
        border.add(c + 6);
        border.add(c - 8);
        c -= 1;
    }
    border.add(c); // inserting last index of box where above while loop stop
    c = i;
    // while for horizontal right
    while (!bombArr.includes(c + 1) && !bombArr.includes(c - 6) && !bombArr.includes(c + 8)) {
        if (right.has(c) || c == 6 || c == 69) {
            break;
        }
        blank.add(c - 6);
        blank.add(c + 8);
        blank.add(c + 1);
        border.add(c - 6);
        border.add(c + 8);
        c += 1;
    }
    border.add(c);
    c = i;
    // while for vertical up
    while (!bombArr.includes(c - 7) && !bombArr.includes(c - 6) && !bombArr.includes(c - 8)) {
        if (up.has(c) || c == 0 || c == 6) {
            break;
        }
        if (right.has(c)) {
            blank.add(c - 8);
            blank.add(c - 7);
        } else if (left.has(c)) {
            blank.add(c - 6);
            blank.add(c - 7);
        } else {
            blank.add(c - 6);
            blank.add(c - 8);
            blank.add(c - 7);
        }
        border.add(c - 6);
        border.add(c - 8);
        c -= 7;
    }
    border.add(c);
    c = i;
    // while for vertical down
    while (!bombArr.includes(c + 7) && !bombArr.includes(c + 6) && !bombArr.includes(c + 8)) {
        if (down.has(c) || c == 63 || c == 69) {
            break;
        }
        if (right.has(c)) {
            blank.add(c + 6);
            blank.add(c + 7);
        } else if (left.has(c)) {
            blank.add(c + 8);
            blank.add(c + 7);
        } else {
            blank.add(c + 6);
            blank.add(c + 8);
            blank.add(c + 7);
        }
        border.add(c + 6);
        border.add(c + 8);
        c += 7;
    }
    border.add(c);

    // in case if border element exits the index of boxes delete it
    for (let i of border) {
        if (i < 0 || i > 69) {
            border.delete(i)
        }
    }

    // in case if blank element exits the index of boxes delete it
    for (let i of blank) {
        if (i < 0 || i > 69) {
            blank.delete(i)
        }
    }

    // this is the main part coloring blank element and displaying it
    for (let i of blank) {
        boxes[i].disabled = true;
        boxes[i].style.backgroundColor = "rgb(139, 134, 134)"
    }
}


//main functionality of click and doubleclick
function main() {
    let stop = false;
    //counting clickable boxes and storing it in clickable
    let clickable = 0;
    for (let j = 0; j <= 69; j++) {
        if (boxes[j].disabled == false) {
            clickable += 1;
        }
    }

    //Display flag on click
    let flag = [];
    let flagTime;
    for (let i = 0; i <= 69; i++) {
        boxes[i].onclick = () => {
            if (flag.includes(i)) {
                boxes[i].innerText = " ";
                flag.splice(flag.indexOf(i), 1);
            } else {
                flagTime = setTimeout(e => {
                    boxes[i].innerHTML = "<i class='fa-solid fa-flag'></i>"
                }, 300)
                flag.push(i)
            }
        }
    }

    //functionality of double click
    let count = 0;
    for (let i = 0; i <= 69; i++) {
        boxes[i].ondblclick = () => {
            clearTimeout(flagTime);
            boxes[i].style.backgroundColor = "rgb(139, 134, 134)";
            boxes[i].innerText = "";
            count += 1;


            // show number on dbclick
            if (numbers.includes(i)) {
                boxes[i].innerText = counts[i];
            }

            // Game over
            if (bombArr.includes(i)) {
                for (let j = 0; j < bombArr.length; j++) {
                    boxes[bombArr[j]].style.backgroundColor = "red"
                }
                for (let k = 0; k <= 69; k++) {
                    boxes[k].disabled = true
                }
                stop = true;
                alert("GAME OVER");
            }

            //winner
            if (count >= clickable - 8) {
                for (let j = 0; j < bombArr.length; j++) {
                    boxes[bombArr[j]].style.backgroundColor = "red"
                }
                for (let k = 0; k <= 69; k++) {
                    boxes[k].disabled = true
                }
                stop = true;
                alert("YOU WON");
            }

            boxes[i].disabled = true;
        }
    }

    // timer
    let counterSec = 1;
    let counterMin = 0;
    const timer = setInterval(() => {
        if (stop) {
            clearInterval(timer);
        } else {
            if (counterSec == 60) {
              counterMin +=1;
              counterSec = 0;
            }
            if(counterSec < 10) {
              time.innerText = `0${counterMin}:0${counterSec}`;
            } else {
              time.innerText = `0${counterMin}:${counterSec}`;
            }
            counterSec++;
        }
    }, 1000);

}


alert("RULES:\n1. DOUBLE TAP TO BREAK THE BOX\n2. SINGLE TAP TO MARK THE BOX")
// usage of all the functions are here 
for (let k = 0; k <= 69; k++) {
    boxes[k].onclick = () => {
        bombGenerator();
        blanking(k);
        display();
        main();
        console.log("bomb", bombArr)
    }
}