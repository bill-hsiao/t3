function functions(io, game) {
  const room = {
    num: 0,
    s: ['room 0'],
    players: []
  }
  function init() {
    io.on('connection', onConnect)
  }
  function roomCreate(ids, fn) {
      let data;
      if (room.players.length !== 1) {
        console.log(ids);
        data = [];
        room.players.push(ids)
        data.push(ids)
        data.push(null)
        fn(data)
        console.log('at ' + room.players.length + ' players');
      } else if (room.players.length == 1) {
        room.s.push(`room ${room.num}`)
        room.num ++;
        data = room.players;
        room.players.push(ids)
        console.log('at ' + room.players.length + ' players');
        fn(data)
        room.players.pop();
        room.players.pop();
        io.emit('newGame' ,'initializing game')
      }
    })

  
    emitNewGame() {
      io.emit('newGame' ,'initializing game')
    })
    socket.on('clientReady', (name, move) => {
      console.log(name)
      game.move(name)
      move(name)
    });
    socket.on('disconnect', onClientDisconnect);
    socket.on('updatePlayer', (updatePlayer) => {
      console.log("Someone just moved on the map!")
      updatePlayer() // will trigger the client side function
    });

    socket.on('move', (name, move) => {
      let state = game.getState();
      console.log(name)
      let lastMove;
      console.log(game.o());

      console.log(game.getState());
      // if (game.o() == false) {
      //
      //
      // } else {
        state = game.move(name)
        lastMove = game.getLastMove()
        move(lastMove)


      // }
      io.emit('sendState', state)

      // will trigger the client side function
    });

    socket.on('emittedState', (name, fn) => {
      console.log('emitted state to client');
      fn(name)
    })
    socket.on('updateState', (name, render) => {

      render(name)
    })

  }

  function reset() {
    state = game.newGame()
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
