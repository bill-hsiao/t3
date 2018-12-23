class Game {
  constructor() {
    this.state = [];
  }
  move(idx) {
    let occupied = false;
    for (let i = 0; i <= this.state.length; i ++) {
      occupied = (this.state[i] == idx ? true: false)
      if (occupied) {
        return this.state
      }
    }
    this.state.push(idx)
    if (this.state.length > 5) {
      let built = this.build(this.state);
      this.check(built)
      return this.state
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
  newGame() {
    for (let i = 0; i < this.state.length + 1; i ++) {
      this.state.pop()
    }
    return this.state
  }
  build(list) {
    let listFill = Array(9 - list.length).fill(null);
    list = [...list, ...listFill];   //array of index locations
    let newArr = [];
    let i1, i2, val;   //[i1, i2]  are for building 2d array, val is for mapping out the value
    for (let i = 0; i < list.length; i ++) { //iist [i] gives the proper index location of a value, and the value is dependent on which turn it was played
      val = (list[i] == null ? 'z' : list[i] % 2 == 0 ? 'o' : 'x')
      i2 = i % 3;
      if (i2 == 0) {
        let row = [];
        newArr.push(row);
      }
      i1 = (i - i2) / 3;
      newArr[i1][i2] = val
    }
    console.log(newArr);
    return newArr;
  }
  check(r) {
    for (let i = 0; i < 3; i ++) {
      if (i == 0) {
        if (r[i][i] == r[i+1][i+1] && r[i+1][i+1] == r[i+2][i+2]) {
          console.log('win diagonal');
        }
        if (r[i][i+2] == r[i][i] && r[i][i] == r[i+2][i]) {
          console.log('win');
        }
      }
      if (r[i][0] == r[i][1] && r[i][1] == r[i][2]) {
        console.log('win');
      }
      if (r[0][i] == r[1][i] && r[1][i] == r[2][i]) {
        console.log('win');
      }
    }
  }
}

module.exports = Game
