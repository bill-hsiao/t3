class Io {
  constructor(io) {
    this.io = io;
     // this.game = game;
    this.init = this.init.bind(this)
  }
  init() {
    // console.log(this.io(io));
    this.onConnect = this.onConnect.bind(this)
    console.log(this);
    this.io.on('connection', this.onConnect)
  }

  onConnect(socket) {

    socket.on('disconnect', () => {
      this.io.emit('user disconnected');
    });

    socket.on('', function(updatePlayer){
      console.log("Someone just moved on the map!")
      updatePlayer() // will trigger the client side function
    });
    socket.on('move', (name, move) => {

      console.log(name)
      // this.game.move(name)
      move(name)
      // will trigger the client side function
    });
  }
}


module.exports = Io
