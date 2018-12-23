function controller(socket, client) {
  //using these listeners

  //using these emitters

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
    let data = 'need new game!'
    socket.emit('newGame', data, function(state){
      console.log(state);
      let updateState = client.updateState.bind(client)
      let nextState = updateState(state)
      let boundRender = client.render.bind(client)
      boundRender(nextState)
    });
  }
  return {
    init: init,
    move: move,
    joinGame:joinGame,
    newGame:newGame
  }
}

module.exports = controller
