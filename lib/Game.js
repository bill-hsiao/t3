class Game {
  constructor() {
    this.state = [];
  }
  move(idx) {
    if (this.state.length == 0) {
      this.state.push(idx)
      return this.state
    }
    let occupied = new Boolean(false);
    for (let i = 0; i <= this.state.length; i ++) {
      if (this.state[i] == idx) {
        occupied = true;
        break;
      }
    }
    if (occupied == true) {
      return;
    }
  }
  getState() {
    return this.state
  }
  getLastMove() {
    let idx = this.state.length - 1;
    return this.state[idx]
  }
  o() {
    return (!(this.state.length % 2) ? false : true)
  }
  newGame() {
    this.state = [];
    return this.state
  }

}

module.exports = Game
