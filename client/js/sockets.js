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
      console.log('acknowledgement');
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
