const Game = require('../Game');


class Rooms {
  constructor() {
    this.players = [];
    this.total = {};
  }

}

class Room extends Rooms {
    constructor(player) {
      this.players = [player];
      this.name = '';
      this.game = null
    }
    setB(b) {
      this.players.push(b)
    }
    setName() {
      let a = this.a[0];
      let b = this.b[0];
      this.name = a + b;
    }
    setGame() {

    }
}
