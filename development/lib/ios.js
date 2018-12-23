// Math.random().toString(36).slice(2)
//
// const rooms = {
//
// }
//
// rooms[`${Math.random().toString(36).slice(2)}`] = 'newroom'
//
// console.log(rooms)
//
//
function controller(io, game) {
  const rooms = {
  }
  const container = [];
  function init() {
    io.on('connection', onConnect)
  }
  function onConnect(socket) {
    if (container.length < 1) {
      let nextRoom = Math.random().toString(36).slice(2)
      rooms[`${nextRoom}`] = [];
    }
    socket.on('joinGame', (ids, fn) => {
      socket.join(nextRoom)
      if (container.length !== 1) {
        data = [];
        container.push(ids)
        data.push(ids)
        data.push(null)
        fn(data)
      } else if (container.length === 1) {
        data = container;
        container.push(ids);
        rooms[`${nextRoom}`].push(container[0])
        rooms[`${nextRoom}`].push(container[1])
        console.log(rooms[`${nextRoom}`]);
      }
  })

//
//
// }
// }
