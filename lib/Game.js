class Game {
  constructor() {
    this.state = [];
  }
  move(idx) {
    let occupied = new Boolean(false);
    for (let i = 0; i <= this.state.length; i ++) {
      occupied = (this.state[i] == idx ? true: false)
      if (occupied) {
        return this.state
      }
    }
    this.state.push(idx)
    if (this.state.length > 5) {
      
    }
    return this.state
  }
  getState() {
    return this.state
  }

  getLastMove() {
    return this.state[this.state.length - 1]
  }
  o() {
    return (!(this.state.length % 2) ? false : true)
  }
  newGame() {`
    this.state = [];`
    return this.state
  }
}

module.exports = Game
