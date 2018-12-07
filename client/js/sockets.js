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
  }
  function updatePlayer() {
    socket.emit('updatePlayer', function() {
      console.log('testing');
    });
  }
  //exported methods
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
