(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const socket = io.connect('http://localhost:4000')
const app = require('./sockets')(socket)

const state = {
  view: null
}
const gameUnit = {
  init: boardListeners,
  callback: handleClick
};

app.init()



gameUnit.init()




//eventHandlers


function boardListeners() {
  let board = [...document.getElementsByClassName('game_unit')]
  board.forEach(function(button) {
     button.addEventListener('click', handleClick)
   });
  console.log(board)
};

function handleClick(evt) {
  let val = evt.target.id;
  app.move(val)


}

},{"./sockets":2}],2:[function(require,module,exports){
function controller (socket) {
  const state = [];
  function init() {
    socket.on('connect', function () {
    });
  }
  function updatePlayer() {
    socket.emit('updatePlayer', function(){
      console.log('testing');
    });
  }
  function move(val) {
    socket.emit('move', val, function(){
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

},{}]},{},[1]);
