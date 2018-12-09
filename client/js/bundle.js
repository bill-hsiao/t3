(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class State {
  constructor() {
    this.id = null;
    this.state = null;
    this.opponent = null;
    this.turn = null;
  }
  setId(id) {
    if (id[1] !== null) {
      this.id = id[1]
      this.opponent = id[0]
      this.turn = 1;
    } else if(id[1] == null) {
      this.id = id[0];
      this.turn = 0;
    }
  }
  newGame() {
    this.state = [];
  }
  getState() {
    return this.state
  }
  getLength() {
    return this.state.length % 2
  }
  getTurn() {
    return this.turn
  }

  //socket methods
  joinGame(data) {
    if (data[1] == null) {
      this.setId(data)
    }
    if (data[1] !== null ) {
      //if server sends back an array, it'll be the 2nd player last pushed in
      this.setId(data);
    }
  }

  updateState(newState) {
    this.state = newState
    return this.state
  }

  move(data) {
    this.state.push(data)
    return this.state
  }

  render(arr, arr2) {
    if (!arr2) {
      let oldView = [...document.getElementsByClassName('game_unit')]
      console.log(oldView);
      for (let i = 0; i < arr.length; i ++) {
        if (i % 2 == 0) {
          let block = oldView[arr[i]];
          block.innerText = 'o'
          console.log(block.innerText);
        } else if (i % 2 == 1) {
          let block = oldView[arr[i]];
          block.innerText = 'x'
          console.log(block.innerText);
        }
      }
    }
  }
}

module.exports = State

},{}],2:[function(require,module,exports){
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

},{"./State":1,"./sockets":3}],3:[function(require,module,exports){
function controller(socket, client) {

  function init() {
    //socket event listeners
    socket.on('connect', function() {
      //listens for newGame after being connected
      socket.on('newGame', function() {
        client.newGame()
        console.log(client.getState());
        console.log('new game');
      });
      //listens for sendState after being connected
      socket.on('sendState', function(state) {
        let nextState = client.updateState(state)
        client.render(nextState)
        console.log('state updated');
      });
    });

    // socket.on('newGame', function() {
    //   client.newGame()
    //   console.log(client.getState());
    //   console.log('new game');
    // })
    //
    // socket.on('sendState', function(state) {
    //   let nextState = client.updateState(state)
    //   client.render(nextState)
    //   console.log('state updated');
    // })

  }

  function move(val) {
    let gameTurn = client.getLength();
    let clientTurn = client.getTurn();
    if (clientTurn !== gameTurn) {
      return
    } else if (clientTurn == gameTurn ){
      socket.emit('move', val, function(val) {
        let boundMove = client.move.bind(client)
        boundMove(val)
      });
    }
  }
  function joinGame() {
    let id = socket.id;
    socket.emit('joinGame', id, function(id) {
      console.log(id);
      let temp = client.joinGame.bind(client);
      temp(id)
    });
  }
  function newGame() {
    socket.emit('newGame', function() {
      console.log('newgame');
    })
  }
  return {
    init: init,
    move: move,
    joinGame:joinGame,
    newGame:newGame
  }
}

module.exports = controller

},{}]},{},[2]);
