const { getAttribute } = require('./play_game');

class GenerateDice {
  constructor(winData, looseData) {
    this.winData = winData;
    this.looseData = looseData;
    this.history = [];
    this.totalNoOfWins = [...this.winData.values()].reduce((acc, val) => acc + val, 0);
  }

  play() {
    const temp = getAttribute(this.totalNoOfWins, this.winData, this.looseData);
    this.history.push(temp[1]);
    if (temp[0] === 'W') {
      const currentCont = this.winData.get(temp[1]);
      this.winData.set(temp[1], currentCont ? currentCont - 1 : 0);
      this.totalNoOfWins--;
      console.log(`Won: ${temp[1]}`);
    } else {
      console.log(`Loose: ${temp[1]}`);
    }
  }

  displayHistory() {
    return this.history;
  }
}

module.exports = GenerateDice;
