function controller(io, game) {

  function init() {
    io.on('connection', onConnect)
  }
  const room = {
    num: 0,
    s: ['room 0'],
    players: []
  };
  function rooms(player) {
    this.players = [];
    this.players.push(player)
    return this.players
  }
  // const test = miniController.bind(controller)

  function onConnect(socket) {
    socket.on('joinGame', (ids, fn) => {
      let data;
      if (room.players.length !== 1) {
        data = ids;
        fn(data)
        room.players.push(ids)
        rooms(ids)
        console.log('at ' + room.players.length + ' players');
      } else if (room.players.length == 1) {
        room.s.push(`room ${room.num}`)
        room.num ++;
        data = room.players;
        room.players.push(ids)

        fn(data)

        room.players.pop();
        room.players.pop();
        io.emit('newGame' ,'initializing game')

      }
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
      console.log(name)
      game.move(name)
      console.log(game.o());

      console.log(game.getState());
      move(name)
      // will trigger the client side function
    });


    socket.on('render', (name, render) => {

      render(name)
    })
  }



  function onClientDisconnect() {
    //remove
  }

  return {
    init: init

  }





}

module.exports = controller
