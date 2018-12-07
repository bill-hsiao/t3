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
  setOpponent(id) {
    this.opponent = id;
    return this.opponent
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
    console.log('from joingame method' + data);
    if (data[1] == null) {
      console.log(data);
      this.setId(data)
    }
    if (data[1] !== null ) {
      //if server sends back an array, it'll be the 2nd player last pushed in
      this.setId(data);
    }
  }

  updateState(newState) {
    // if (this.state == null) {
    //   'state null'
    // }
    // if (this.state.length == newState.length) {
    //   return
    // } else if (this.state.length == (newState.length - 1)
    //   this.state = newState.slice()
    // {
      this.state = newState
      
    // }

  }

  move(data) {
    console.log('testing' + data);
    this.state.push(data)
    return this.state
  }

  render(arr, arr2) {
    if (!arr2) {
      let oldView = [...document.getElementsByClassName('game_unit')]
      console.log(oldView);
      // oldView = [...document.getElementsByClassName('game_unit')]
  //    console.log(oldView);
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
  //const client = (id) => {return id}
  function init() {
    //socket event listeners
    socket.on('connect', function() {


    });
    // socket.on('newGame', function(msg) {
    //   console.log(msg);
    // });
    // socket.on('nextTurn', function(data) {
    //   console.log('Incoming message:', data);
    // });
    socket.on('newGame', function() {
      client.newGame()
      console.log(client.getState());
      console.log('new game');
    })
    socket.on('sendState', function(state, update) {
      console.log('from sendState' + state);
  //    let render = client.render.bind(client)
    //  let enclosed = client.updateState.bind(client)
  //    enclosed(state)
  //    render(state)
     console.log(state, update);
      // socket.emit('emittedState', state, (state) => {
        // console.log('from emittedState' + state);
        // let render = client.render.bind(client)
        // let enclosed = client.updateState.bind(client)
        // enclosed(state)
        // render(state)
      //  client.updateState
      // })
      console.log('state updated');
    })

  }
  function updatePlayer() {
    socket.emit('updatePlayer', function() {
      console.log('testing');
    });
  }
  //exported methods
  function move(val) {
    let gameTurn = client.getLength();
    let clientTurn = client.getTurn();
    if (clientTurn !== gameTurn) {
      return
    } else if (clientTurn == gameTurn ){
      socket.emit('move', val, function(val) {
        let render = client.render.bind(client)

        let move = client.move.bind(client)
      ///  let render = client.render.bind(client)
        render(move(val))

      })
    }

  }

  function joinGame() {
    let id = socket.id;
    // let method = client.joinGame
    socket.emit('joinGame', id, function(id) {
      console.log(id);
      let temp = client.joinGame.bind(client);
      temp(id)
    // function(data) {
    //   if (data.length == 2) {
    //     let o = client(data[0])
    //     console.log('client' + o);
    //     console.log(data[0]);
    //     console.log(data[1]);
    //   }
    //   console.log(data);
    // }
  }
  )
  }
  // function clientReady() {
  //   socket.emit('clientReady', )
  // }
  // function render(state) {
  //   client.render(state)
  //   socket.emit('render', state, function(data) {
  //     console.log(state);
  //
  // })
  function modulate() {

  }
  function modulator(num) {

  }
//  function render()
  // function setClosure(method, data, closure) {
  //   console.log(data);
  //   let enclosed = method.bind(closure);
  //   enclosed(data)
  // }
  return {
    init: init,
    //updatePlayer:updatePlayer,
    move: move,
    joinGame:joinGame
    // ,
    // render: render
  }
}

module.exports = controller

},{}]},{},[2]);
