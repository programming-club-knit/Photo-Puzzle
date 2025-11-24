
const board = document.getElementById("game-board");
const shuffleBtn = document.getElementById("shuffle-btn");
const timerEl = document.getElementById("timer");
const movesEl = document.getElementById("moves");
const messageEl = document.getElementById("message");

let tiles = [];
let timer = 0;
let moves = 0;
let hasStated = false;
let interval = null;


init();

function init() {
  tiles = Array.from({ length: 9 }, (_, i) => i); 
  shuffleTiles();        
  renderBoard();          
  startTimer();           

  
shuffleBtn.addEventListener("click", () => {

  moves = 0;
  timerEl.textContent = timer;
  movesEl.textContent = moves;

  startTimer();     
  shuffleTiles();    
  renderBoard();
  hideMessage();
});


function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
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

 
  const wrongAdjacency = [
    emptyIndex - 3,
    emptyIndex + 3,
    emptyIndex - 1,
    emptyIndex + 1,
  ];

  if (!wrongAdjacency.includes(index)) return;

  
  const clickedTile = board.children[index];
  const emptyTile = board.children[emptyIndex];
  board.insertBefore(clickedTile, emptyTile); 

  moves++;
  movesEl.textContent = moves;
  checkWin(); 
}


function checkWin() {
  
  const isSolved = tiles.every((val, i) => val === i + 1); 
  if (isSolved) {
    stopTimer();
    messageEl.classList.remove("hidden");
    alert("You won!");
  }
}


function startTimer() {
  if(hasStated) return;
  interval = setInterval(() => {  
    timer++;
    timerEl.textContent = timer;
  }, 1000);
  hasStated=true
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}

function hideMessage() {
  messageEl.classList.add("hidden");
}

}