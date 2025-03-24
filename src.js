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
const Player = (name, marker, turn) => {
  const playerName = name;
  const playerMarker = marker;
  let playerTurn = turn;

  const getName = () => playerName;
  const getMarker = () => playerMarker;
  const toggleTurn = () => playerTurn = !playerTurn;
  const getTurn= () => playerTurn;

  return {getName, getMarker, toggleTurn, getTurn};
};

//Factory IIFE
const Gamecontroller = (() => {

  const board = Gameboard.getBoard();
  const mark_x = 'X';
  const mark_o = 'O';
  let player1 = null;
  let player2 = null;
  let players = 0;
  let turn = !!(Math.round(Math.random())); //used in Player.turn true/false
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
      player1 = Player(name, mark_x, turn);
      players++;
      return 1;
    }
    if (players === 1){
      player2 = Player(name, mark_o, !turn);
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

    playerTrue = checkTurn();
    playerFalse = checkFalse();
    board[index] = playerTrue.getMarker();
    playerTrue.toggleTurn()
    playerFalse.toggleTurn();
    if (checkGameOutcome(playerTrue)) { //If victory
      endGame(playerTrue.getName());
    }
    Displaycontroller.setTurnText();
    return 1;

  }

  const checkGameOutcome = (player) => { //Bruteforce lol
    //Sideways
    marker = player.getMarker();
    console.log('MARKER IS', marker);
    if (board[0] === marker && board[1] === marker && board[2] === marker) {
      return 1;
    }
    if (board[3] === marker && board[4] === marker && board[5] === marker) {
      return 1;
    }
    if (board[6] === marker && board[7] === marker && board[8] === marker) {
      return 1;
    }

    //Downwards
    if (board[0] === marker && board[3] === marker && board[6] === marker) {
      return 1;
    }
    if (board[1] === marker && board[4] === marker && board[7] === marker) {
      return 1;
    }
    if (board[2] === marker && board[5] === marker && board[8] === marker) {
      return 1;
    }

    //Cross
    if (board[0] === marker && board[4] === marker && board[8] === marker) {
      return 1;
    }
    if (board[2] === marker && board[4] === marker && board[6] === marker) {
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
    for (const player of getPlayers()) {
        if (player.getTurn()) return player;
    }
    return null;
  };

  const checkFalse = () => {
    for (const player of getPlayers()) {
        if (!player.getTurn()) return player;
    }
    return null;
  };

  const endGame = (name) => {
    Displaycontroller.removeGrid();
    Displaycontroller.setTitleText(name)
  }

  return{getBoard, addPlayer, getPlayers, placeMarker, start, checkTurn, checkFalse, endGame};
  //
})();

//Factory IIFE
const Displaycontroller = (() => {
  const pTurn = document.querySelector('.turn');
  const grid = document.querySelector('.main-grid');
  const title = document.querySelector('h1');
  const board = Gameboard.getBoard();
  const players = Gamecontroller.getPlayers();

  const setButtonText = (event, index) => {
    event.target.innerText = board[index];
    return 1;
  }

  const setTurnText = () => {
    playerTrue = Gamecontroller.checkTurn();
    pTurn.innerText = playerTrue.getName()+"'s turn.";
    return 1;
  }

  const setTitleText = (name) => {
    title.innerText = name + " is the winner!";
    return 1;
  }

  const removeGrid = () => {
    pTurn.remove();
    grid.remove();
    return 1;
  }

  return {setButtonText, setTurnText, setTitleText, removeGrid};
})();


const InputHandler = (() => {
  const form = document.querySelector('form');
  const dia = document.querySelector('dialog');
  dia.showModal();

  const clickHandler = (event) => {
    const index = event.target.getAttribute("data-index");
    Gamecontroller.placeMarker(index);
    Displaycontroller.setButtonText(event, index);
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