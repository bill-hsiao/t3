(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class State {
  constructor() {
    this.id = undefined;
    this.state = [];
    this.opponent = undefined;
    this.first = undefined;
  }
  setId(id) {
    this.id = id;
  }
  joinGame(data) {
    if (typeof data === String) {
      this.setId(data)
    }
    if (data.length == 2) {
      let o = client(data[0])
      console.log('client' + o);
      console.log(data[0]);
      console.log(data[1]);
    }
    console.log(data);
  }
  updateState(newState) {
    if (this.state.length == newState.length) {
      return
    } else {
      this.state = newState.slice()
    }
  }

}

module.exports = State

},{}],2:[function(require,module,exports){
const socket = io.connect('http://localhost:4000')
const State = require('./State')
const client = new State()
const app = require('./sockets')(socket, client)

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
  const state = [];
  //const client = (id) => {return id}
  function init() {
    socket.on('connect', function() {
    });
    socket.on('newGame', function() {
      console.log(msg);
    });
    socket.on('nextTurn', function(data) {
      console.log('Incoming message:', data);
    });
  }
  function updatePlayer() {
    socket.emit('updatePlayer', function() {
      console.log('testing');
    });
  }
  function move(val) {
    !(state.length % 2) ? false : true

    socket.emit('move', val, function(data) {
      //
      console.log('testing' + data);
      state.push(data)
      render()
    });
  }

  function joinGame(evt) {
    socket.emit('joinGame', socket.id, client.joinGame
    // function(data) {
    //   if (data.length == 2) {
    //     let o = client(data[0])
    //     console.log('client' + o);
    //     console.log(data[0]);
    //     console.log(data[1]);
    //   }
    //   console.log(data);
    // }
  )
  }
  function clientReady() {
    socket.emit('clientReady', )
  }
  function render() {
    socket.emit('render', state, function(data) {
      console.log(state);

  })
  function modulate() {

  }
  function modulator(num) {

  }
  }
  return {
    init: init,
    updatePlayer:updatePlayer,
    move: move,
    joinGame:joinGame,
    render: render
  }
}

module.exports = controller

},{}]},{},[2]);
