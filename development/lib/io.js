const Game = require('./Game');


//test
function controller(io) {
  const rooms = {
  }
  const games = {
  }
  let currentRoom = Math.random().toString(36).slice(2);
  const container = [];
  function init() {
    io.on('connection', onConnect)
  }
  function onConnect(socket) {
    rooms[`${currentRoom}`] = [];

    socket.on('joinGame', (ids, fn) => {
      socket.join(currentRoom)
      if (container.length !== 1) {
        data = [];
        container.push(ids)
        data.push(ids)
        data.push(null)
        fn(data)
      } else if (container.length === 1) {
        data = container;
        container.push(ids);
        console.log(container);
        rooms[`${currentRoom}`].push(container[0])
        rooms[`${currentRoom}`].push(container[1])
        data = container;
        fn(data)
        container.pop();
        container.pop();
        games[`${currentRoom}`] = new Game();
        io.in(`${currentRoom}`).emit('newGame', 'initializing game');
        currentRoom = Math.random().toString(36).slice(2);
        rooms[`${currentRoom}`] = [];

      }
  })

    socket.on('disconnect', onClientDisconnect);
    socket.on('move', (name, move) => {
      let obj = idToGame(socket.id);
      let key = obj.key;
      let thisGame = obj.game;
      //let key = idToGame(socket.id)
      let state = thisGame.getState();
      console.log(name)
      let lastMove;
      state = thisGame.move(name)
      lastMove = thisGame.getLastMove()
      move(lastMove)
      console.log(socket.id);
      io.in(`${key}`).emit('sendState', state);

      // will trigger the client side function
    });
    function idToGame(id) {
      let ids = Object.values(rooms)
      let keys = Object.keys(rooms)
      let key;
      let thisGame;
      for (let i = 0; i < ids.length; i ++) {
        if (id === ids[i][0] || id === ids[i][1]) {
          key = keys[i]
          thisGame = games[key]
          console.log(games[key])
        }
      }
      return {
        key: key,
        game: thisGame
      }
    }
    socket.on('newGame',
          function(data, fn){
            console.log(data);
            let obj = idToGame(socket.id);
            let key = obj.key;
            let thisGame = obj.game;
            let state = thisGame.getState();
            state = thisGame.newGame();
            games[key] = state;
            io.in(`${key}`).emit('sendState', 'z');
            console.log(state);
            fn('z')
          }
         );
  }

  function reset() {
    //state = game.newGame()
    io.emit('sendState', state)
  }

  function onClientDisconnect() {
    //remove
  }

  return {
    init: init,
    reset: reset
  }

}

module.exports = controller
