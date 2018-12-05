class Game {
  constructor() {
    this.state = [];
  }
  move(idx) {
    this.state.push(idx)
  }
  getTurn() {
    return this.state.length % 2
  }
  newGame() {
    this.state = [];
  }

}

module.exports = Game
