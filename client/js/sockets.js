function controller(socket, client) {
  const state = [];
  //const client = (id) => {return id}
  function init() {
    socket.on('connect', function() {
    });
    socket.on('newGame', function(msg) {
      console.log(msg);
    });
    socket.on('nextTurn', function(data) {
      console.log('Incoming message:', data);
    });
    socket.on('newGame', function() {
      client.newGame()
      console.log(client.getState());
      console.log('new game');
    })
    socket.on('sendState', function(state) {
      socket.emit('emittedState', state, client.updateState)
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
    //!(state.length % 2) ? false : true
    socket.emit('move', val, client.move);
  }

  function joinGame(evt) {
    let id = socket.id;
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
  function render() {
    socket.emit('render', state, function(data) {
      console.log(state);

  })
  function modulate() {

  }
  function modulator(num) {

  }
  function setClosure(method, data, closure) {
    console.log(data);
    let enclosed = method.bind(closure);
    enclosed(data)
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
