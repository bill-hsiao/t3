class Game {
  constructor() {
    this.state = [];
  }
  move(idx) {
    let occupied = new Boolean(false);
    for (let i = 0; i < this.state.length; i ++) {
      if (this.state[i] == idx) {
        occupied = true;
        break;
      }
    }
    if (occupied == true) {
      return;
    } else {
      this.state.push(idx)
    }
  }
  getState() {
    return this.state
  }
  o() {
    return (!(this.state.length % 2) ? false : true)
  }
  newGame() {
    this.state = [];
  }

}

module.exports = Game
