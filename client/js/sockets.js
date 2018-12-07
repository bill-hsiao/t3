function controller(socket, client) {
  //const client = (id) => {return id}
  function init() {
    //socket event listeners
    socket.on('connect', function() {


    });
    // socket.on('newGame', function(msg) {
    //   console.log(msg);
    // });
    // socket.on('nextTurn', function(data) {
    //   console.log('Incoming message:', data);
    // });
    socket.on('newGame', function() {
      client.newGame()
      console.log(client.getState());
      console.log('new game');
    })
    socket.on('sendState', function(state, update) {
      console.log('from sendState' + state);
  //    let render = client.render.bind(client)
    //  let enclosed = client.updateState.bind(client)
  //    enclosed(state)
  //    render(state)
     console.log(state, update);
      // socket.emit('emittedState', state, (state) => {
        // console.log('from emittedState' + state);
        // let render = client.render.bind(client)
        // let enclosed = client.updateState.bind(client)
        // enclosed(state)
        // render(state)
      //  client.updateState
      // })
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
    let gameTurn = client.getLength();
    let clientTurn = client.getTurn();
    if (clientTurn !== gameTurn) {
      return
    } else if (clientTurn == gameTurn ){
      socket.emit('move', val, function(val) {
        let render = client.render.bind(client)

        let move = client.move.bind(client)
      ///  let render = client.render.bind(client)
        render(move(val))

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
  // function render(state) {
  //   client.render(state)
  //   socket.emit('render', state, function(data) {
  //     console.log(state);
  //
  // })
  function modulate() {

  }
  function modulator(num) {

  }
//  function render()
  // function setClosure(method, data, closure) {
  //   console.log(data);
  //   let enclosed = method.bind(closure);
  //   enclosed(data)
  // }
  return {
    init: init,
    //updatePlayer:updatePlayer,
    move: move,
    joinGame:joinGame
    // ,
    // render: render
  }
}

module.exports = controller
