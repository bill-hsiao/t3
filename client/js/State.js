class State {
  constructor() {
    this.id = undefined;
    this.state = [];
    this.opponent = undefined;
    this.first = undefined;
  }
  setId(id) {
    this.id = id;
  }
  joinGame(data) {
    if (typeof data === String) {
      this.setId(data)
    }
    if (data.length == 2) {
      let o = client(data[0])
      console.log('client' + o);
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
    }
  }

}

module.exports = State
