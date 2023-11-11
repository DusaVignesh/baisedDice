const GenerateId = require('./GenerateID');

class Game {
  constructor() {
    this.generateID = new GenerateId();
  }

  play(id) {
    const temp = this.generateID.lobby.get(id);
    temp.play();
    return temp.displayHistory();
  }

  create() {
    return this.generateID.generate();
  }
}

module.exports = Game;
