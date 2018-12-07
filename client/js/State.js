class State {
  constructor() {
    this.id = null;
    this.state = null;
    this.opponent = null;
    this.first = null;
  }
  setId(id) {
    if (id[1]) {
      this.opponent = id[1]
    }
    this.id = id[0];
  }
  setOpponent(id) {
    this.opponent = id;
    return this.opponent
  }
  newGame() {
    this.state = [];
  }
  getState() {
    return this.state
  }



  //socket methods
  joinGame(data) {
    console.log('from joingame method' + data);
    if (typeof data === String) {
      console.log(data);
      this.setId(data)
    }
    if (data.length == 2) {
      this.setId(data);
      this.setOpponent(data[1])
      //let o = client(data[0])
      //console.log('client' + o);
      console.log(data[0]);
      console.log(data[1]);
    }
    console.log(data);
  }

  updateState(newState) {
    if (this.state.length == newState.length) {
      return
    } else {
      this.state = newState.slice()
      render(this.state)
    }
  }

  move(data) {
    console.log('testing' + data);
    this.state.push(data)
    render(this.state)
  }

  render(arr, arr2) {
    if (!arr2) {
      let view = [...document.getElementsByClassName('game_unit')]
      console.log(view);
      if (!arr.length) {
        return
      }
      let view = [...document.getElementsByClassName('game_unit')]
      console.log(view);
      for (let i = 0; i < arr.length; i ++) {
        if (i % 2 == 0) {
          let block = view[arr[i]];
          console.log(block);
        }
      }
    } else {

    }
  }


}

module.exports = State
