class RoomManager {
  constructor() {
    this.totalPlayers = [];
    this.rooms = {
      num: 0,
      rooms: []
    }
  }
  increment() {
    this.rooms.num ++;
  }
  findRoom(id) {
    for (let i = 0; i < this.totalPlayers.length; i ++) {
      console.log(this.totalPlayers);
      if (id === this.totalPlayers[i][0]) {
        return this.totalPlayers[i][1]
      }
    }
  }
}

class Room {
  constructor(num){
    this.players = null;
    this.roomId = num;
    this.game = null;
  }
  addPlayers(a) {
    this.players = a;
    console.log(this.players);
  }
  setGame(game) {
    this.game = game;
  }
  emitToBoth(socket) {

  }
  getGame() {
    return this.game
  }

}




module.exports = {
  RoomManager: RoomManager,
  Room: Room
}
