const socket = io.connect('http://localhost:4000')
const app = require('./sockets')(socket)

const state = {
  view: null
}
const gameUnit = {
  init: boardListeners,
  callback: handleClick
};

app.init()



gameUnit.init()




//eventHandlers


function boardListeners() {
  let board = [...document.getElementsByClassName('game_unit')]
  board.forEach(function(button) {
     button.addEventListener('click', handleClick)
   });
  console.log(board)
};

function handleClick(evt) {
  let val = evt.target.id;
  app.move(val)


}
