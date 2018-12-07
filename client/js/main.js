const socket = io.connect('http://localhost:4000')
const State = require('./State')
const client = new State()
const controller = require('./sockets')
const app = controller(socket, client)

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
document.getElementById('new_game').addEventListener('click', () => {
  app.joinGame()

})

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
//app.joinGame(val)

}
