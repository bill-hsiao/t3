const _Rooms = require('./roomController/rooms')

function controller(io, game) {
  //using these listeners

  //using these emitters

  const room = {
    num: 0,
    s: ['room 0'],
    players: []
  }
  function init() {
    io.on('connection', onConnect)
  }
  function onConnect(socket) {
    console.log(game.state);
    socket.on('joinGame', (ids, fn) => {
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
    socket.on('disconnect', onClientDisconnect);
    socket.on('move', (name, move) => {
      let state = game.getState();
      console.log(name)
      let lastMove;
      state = game.move(name)
      lastMove = game.getLastMove()
      move(lastMove)
      io.emit('sendState', state)

      // will trigger the client side function
    });
    // socket.on('newGame', function(val, fn) {
    //   let state;
    //   game.newGame();
    //   state = game.getState();
    //   console.log(state);
    //   console.log(fn());
    //   console.log(val);
    //   io.emit('sendState', state)
    // })


    socket.on('newGame',
          function(data, fn){
            console.log(data);
            let state;
            game.newGame();
            state = game.getState();
            io.emit('sendState', 'z')
            console.log(state);
            fn('z')

          }
         );
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
