const answerSudokuBoard = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const userSudokuBoard = [
  [null, 3, null, null, null, 8, null, 1, null],
  [null, null, 2, null, 9, null, null, 4, 8],
  [null, null, null, 3, null, null, 5, 6, null],
  [8, null, null, null, null, 1, null, 2, 3],
  [null, null, 6, null, 5, null, 7, null, null],
  [7, 1, null, 9, null, null, null, null, 6],
  [9, 6, 1, null, null, null, null, null, null],
  [null, 8, null, null, 1, null, 6, null, null],
  [null, null, null, 2, null, null, null, 7, null],
];

const cells = document.querySelectorAll(".sudoku-cell");

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("keypress", handleOnCellClick);
}

//////////////limiting

cells.forEach((cell) => {
  cell.addEventListener("input", function () {
    limitContent(this);
  });
});

function limitContent(element) {
  // Get the current content of the cell
  let content = element.innerText;

  // Apply a regular expression to keep only numeric characters
  content = content.replace(/\D/g, "");

  // Limit the content to one character
  content = content.substring(0, 1);

  // Update the content of the cell
  element.innerText = content;
}
/////////////////////

function handleOnCellClick(e) {
  const coordinateString = e.target.getAttribute("value");
  const value = e.key;
  const coordinate = coordinateString.split(",");
  const [x, y] = coordinate;

  userSudokuBoard[x][y] = parseInt(value); //storing updating

  if (userSudokuBoard[x][y] === answerSudokuBoard[x][y]) {
    e.target.style.backgroundColor = "white";
  } else {
    e.target.style.backgroundColor = "red";
  }

  checkAll();
}

function checkAll() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (userSudokuBoard[i][j] != answerSudokuBoard[i][j]) {
        return;
      }
    }
  }

  const h1Tag = document.querySelector("h1");
  h1Tag.style.color = "#9ADE7B";
  h1Tag.innerText = "SUDOKU SOLVED!";
  const outline = document.querySelector(".sudoku-outline");
  outline.style.borderColor = "#9ADE7B";
  const pTag = document.querySelector("body p");
  pTag.parentNode.removeChild(pTag);
}
