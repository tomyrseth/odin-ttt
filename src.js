function isEven(n) {
  return n % 2 == 0;
}
//Factory IIFE
const Gameboard = (() => {
  const board = new Array(9).fill(null);

  //const createEmptyBoard = () => board.fill(null, 0, 9);
  const getBoard = () => board;

  const placeMark = (index, mark) => {
    if (index > 8) {
      throw Error('index is too high')
    }
    board[index] = mark;
  }
  return {getBoard, placeMark};
})();

//Factory Player
const Player = (name, marker) => {
  const playerName = name;
  const playerMarker = marker;

  const getName = () => playerName;
  const getMarker = () => playerMarker;

  return {getName, getMarker};
};

//Factory IIFE
const Gamecontroller = (() => {

  const board = Gameboard.getBoard();
  const mark_x = 'X';
  const mark_o = 'O';
  let player1 = null;
  let player2 = null;
  let players = 0;
  let turn = Math.round(Math.random()); // Even number = p1 turn, odd number = p2 turn

  //check for wins

  const getBoard = () => board;
  const getPlayers = () => {
    return [player1, player2];
  }

  const addPlayer = (name) => {
    if (players >= 2) {
      alert('Maximum players reached');
      return 0;
    }
    if (players === 0) {
      player1 = Player(name, mark_x);
      players++;
      return 1;
    }
    if (players === 1){
      player2 = Player(name, mark_o);
      players++;
      return 1;
    }
    throw Error('Could not add player');
  }

  const start = () => {
    Displaycontroller.setTurnText(turn);
  }

  const placeMarker = (index) => {
    if (players != 2){
      alert('Need more players');
      return 0;
    };
    if (board[index] != null || index >= 9 || index < 0 ){
      alert('Choose a valid space!');
      return 0;
    };
    if (checkTurn() === player1) {
      board[index] = player1.getMarker();
      turn++;
      checkWin(player1);
      //setButtonText(player1.getMarker())
      console.log(board);      
      return 1;
    }

    board[index] = player2.getMarker();
    turn++;
    checkWin(player2)
    //setButtonText(player1.getMarker())
    console.log(board);
    return 1;

    // If player.turn player.getmarker

  }

  const checkWin = (player) => { //Bruteforce lol
    //Sideways
    marker = player.getMarker();
    if (board[0] === marker && board[1] === marker && board[2] === marker) {
      console.log(`${player.getName()} won!1`);
      console.log(marker);
      console.log(board[0], board[1], board[2], '?');
      return 1;
    }
    if (board[0] === marker && board[1] === marker && board[2] === marker) {
      console.log(`${player.getName()} won!2`);
      console.log(marker);
      return 1;
    }
    if (board[0] === marker && board[1] === marker && board[2] === marker) {
      console.log(`${player.getName()} won!3`);
      console.log(marker);
      return 1;
    }

    //Downwards
    if (board[0] === marker && board[1] === marker && board[2] === marker) {
      console.log(`${player.getName()} won!4`);
      console.log(marker);
      return 1;
    }
    if (board[0] === marker && board[1] === marker && board[2] === marker) {
      console.log(`${player.getName()} won!5`);
      console.log(marker);
      return 1;
    }
    if (board[0] === marker && board[1] === marker && board[2] === marker) {
      console.log(`${player.getName()} won!6`);
      console.log(marker);
      return 1;
    }

    //Cross
    if (board[0] === marker && board[1] === marker && board[2] === marker) {
      console.log(`${player.getName()} won!7`);
      console.log(marker);
      return 1;
    }
    if (board[0] === marker && board[1] === marker && board[2] === marker) {
      console.log(`${player.getName()} won!8`);
      console.log(marker);
      return 1;
    }

    if (checkDraw()) {
      console.log('DRAW!')
    }

  }

  const checkDraw = () => {
    if (board.includes(null)) return 0;
    return 1;
  }

  const checkTurn = () => {
    if (isEven(turn)) return player1;
    return player2;
  }

  return{getBoard, addPlayer, getPlayers, placeMarker, start, checkTurn};
  //
})();

//Factory IIFE
const Displaycontroller = (() => {
  const pTurn = document.querySelector('.turn');
  const board = Gameboard.getBoard();

  const setButtonText = (button, player) => {
    button.innerText = player.getMarker();
    return 1;
  }

  setTurnText = (turn) => {
    if (isEven(turn)) {
      pTurn.innerText = Gamecontroller.getPlayers()[0].getName()+"'s turn.";
      return 1;
    }
    pTurn.innerText = Gamecontroller.getPlayers()[1].getName()+"'s turn.";
  }

  const clickHandler = (event) => {
    const index = event.target.getAttribute("data-index");
    Gamecontroller.placeMarker(index);
  }

  return {setButtonText, setTurnText,clickHandler, pTurn};
})();


const InputHandler = (() => {
  const form = document.querySelector('form');
  const dia = document.querySelector('dialog');
  dia.showModal();

  const clickHandler = (event) => {
    const index = event.target.getAttribute("data-index");
    console.log(index);
  }

  const formSubmit = (event) => {
    event.preventDefault();
    formData = new FormData(form);
    n1 = formData.get('name1');
    n2 = formData.get('name2');
    Gamecontroller.addPlayer(n1); 
    Gamecontroller.addPlayer(n2); 

    dia.close();
    Gamecontroller.start();
    return 1;
  }
  form.addEventListener("submit", formSubmit, false);

  return {clickHandler};
})();



/*
0 1 2
3 4 5
6 7 8

O O X
X O X
O X O

X X O
O X O
X O X

Gamecontroller.addPlayer('Tom'); 
Gamecontroller.addPlayer('Sa'); 
Gamecontroller.placeMarker(0); 
Gamecontroller.placeMarker(2); 
Gamecontroller.placeMarker(1); 
Gamecontroller.placeMarker(3); 
Gamecontroller.placeMarker(4);
Gamecontroller.placeMarker(5);
Gamecontroller.placeMarker(6);
Gamecontroller.placeMarker(7);
Gamecontroller.placeMarker(8);

*/