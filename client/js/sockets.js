function controller(socket) {
  const state = [];
  function init() {
    socket.on('connect', function () {
    });
  }
  function updatePlayer() {
    socket.emit('updatePlayer', function() {
      console.log('testing');
    });
  }
  function move(val) {
    socket.emit('move', val, function() {
      console.log('testing' + val);
      state.push(val)
    })
  }
  return {
    init: init,
    updatePlayer:updatePlayer,
    move: move
  }
}

module.exports = controller
