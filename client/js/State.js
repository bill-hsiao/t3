class State {
  constructor() {
    this.id = null;
    this.state = null;
    this.opponent = null;
    this.turn = null;
  }
  setId(id) {
    if (id[1] !== null) {
      this.id = id[1]
      this.opponent = id[0]
      this.turn = 1;
    } else if(id[1] == null) {
      this.id = id[0];
      this.turn = 0;
    }
  }
  newGame() {
    this.state = [];
  }
  getState() {
    return this.state
  }
  getLength() {
    return this.state.length % 2
  }
  getTurn() {
    return this.turn
  }

  //socket methods
  joinGame(data) {
    if (data[1] == null) {
      this.setId(data)
    }
    if (data[1] !== null ) {
      //if server sends back an array, it'll be the 2nd player last pushed in
      this.setId(data);
    }
  }

  updateState(newState) {
    this.state = newState
    console.log(this.state);
    console.log(newState);
    return this.state
  }

  move(data) {
    console.log('testing' + data);
    this.state.push(data)
    return this.state
  }

  render(arr, arr2) {
    if (!arr2) {
      let oldView = [...document.getElementsByClassName('game_unit')]
      console.log(oldView);
      for (let i = 0; i < arr.length; i ++) {
        if (i % 2 == 0) {
          let block = oldView[arr[i]];
          block.innerText = 'o'
          console.log(block.innerText);
        } else if (i % 2 == 1) {
          let block = oldView[arr[i]];
          block.innerText = 'x'
          console.log(block.innerText);
        }
      }
    }
  }
}

module.exports = State
