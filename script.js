
const board = document.getElementById("game-board");
const shuffleBtn = document.getElementById("shuffle-btn");
const timerEl = document.getElementById("timer");
const movesEl = document.getElementById("moves");
const messageEl = document.getElementById("message");

function show(){
    let image=document.getElementById("image");

document.getElementById("origin").addEventListener("click",(e)=> {
    image.src="https://picsum.photos/600";
})
 timer();
 function timer(){
    setTimeout(()=>{
        image.src="";
        
    },3000);
}
}

let tiles = [];
let timer = 0;
let moves = 0;
let interval = null;



init();

function init() {
  tiles = Array.from({ length: 9 }, (_, i) => i); 
  shuffleTiles();        
  renderBoard();          
  startTimer();           

  
shuffleBtn.addEventListener("click", () => {
  timer = 0;
  moves = 0;
  timerEl.textContent = timer;
  movesEl.textContent = moves;

  startTimer();     
  shuffleTiles();    
  renderBoard();
  hideMessage();
});


function shuffleTiles() {
  // Use Fisher-Yates to produce a random permutation, but only accept
  // permutations that are solvable for a 3x3 (8-puzzle) board.
  function isSolvable(arr) {
    const flat = arr.slice();
    // count inversions excluding the blank (represented by 8)
    let inv = 0;
    for (let i = 0; i < flat.length; i++) {
      for (let j = i + 1; j < flat.length; j++) {
        if (flat[i] === 8 || flat[j] === 8) continue;
        if (flat[i] > flat[j]) inv++;
      }
    }
    // For odd grid width (3), puzzle is solvable when inversion count is even
    return inv % 2 === 0;
  }

  // generate until the puzzle is become solvable
  let attempt;
  do {
    attempt = Array.from({ length: 9 }, (_, i) => i);
    for (let i = attempt.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [attempt[i], attempt[j]] = [attempt[j], attempt[i]];
    }
  } while (!isSolvable(attempt));

  tiles = attempt;
}


function renderBoard() {
  board.innerHTML = "";

  tiles.forEach((val, index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");

   
    if (val === 8) {
      tile.classList.add("empty");
    } else {
      const x = val % 3;
      const y = Math.floor(val / 3);
      tile.style.backgroundPosition = `${-x * 100}px ${-y * 100}px`;
    }

    
    tile.addEventListener("click", () => moveTile_UI_Only(index)); 
    board.appendChild(tile);
  });
}


function moveTile_UI_Only(index) {
  const emptyIndex = tiles.indexOf(8);

  function isAdjacent(a, b) {
    // same column distance (up/down)
    if (Math.abs(a - b) === 3) return true;
    //  left/right must be on same row
    if (Math.abs(a - b) === 1 && Math.floor(a / 3) === Math.floor(b / 3)) return true;
    return false;
  }

  if (!isAdjacent(index, emptyIndex)) return;

  // swap tiles
  [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
  renderBoard();

  moves++;
  movesEl.textContent = moves;
  checkWin();
}


function checkWin() {
  const isSolved = tiles.every((val, i) => val === i);
  if (isSolved) {
    stopTimer();
    messageEl.classList.remove("hidden");
    alert("You won!");
  }
}


function startTimer() {
  interval = setInterval(() => {  
    timer++;
    timerEl.textContent = timer;
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}

function hideMessage() {
  messageEl.classList.add("hidden");
}

}