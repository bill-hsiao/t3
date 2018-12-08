function controller(socket, client) {
  //const client = (id) => {return id}
  function init() {
    //socket event listeners
    socket.on('connect', function() {


    });

    socket.on('newGame', function() {
      client.newGame()
      console.log(client.getState());
      console.log('new game');
    })
    socket.on('sendState', function(state) {
      console.log('from sendState' + state);
     console.log(state);

      let nextState = client.updateState(state)
      client.render(nextState)
      console.log('state updated');
    })

  }
  function updatePlayer() {
    socket.emit('updatePlayer', (state) => {
      console.log('testing');
    });
  }
  function move(val) {
    let gameTurn = client.getLength();
    let clientTurn = client.getTurn();
    if (clientTurn !== gameTurn) {
      console.log('client turn ' + clientTurn);
      console.log('gameTurn ' + gameTurn);
      return
    } else if (clientTurn == gameTurn ){
      console.log('client turn ' + clientTurn);
      console.log('gameTurn ' + gameTurn);
      socket.emit('move', val, function(val) {
        let bound = client.render.bind(client)

        let boundMove = client.move.bind(client)
        boundMove(val)

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

  }
  )
  }
  return {
    init: init,
    move: move,
    joinGame:joinGame

  }
}

module.exports = controller
