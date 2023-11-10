
function weightedRandom(choices, probabilities) {
  let cumulativeProbability = 0;
  const randomValue = Math.random();

  for (let i = 0; i < choices.length; i++) {
    cumulativeProbability += probabilities[i];
    if (randomValue <= cumulativeProbability) {
      return choices[i];
    }
  }
}

function offer(winloseProb,winData,winProb,lossData,lossProb) {
  const outcome = weightedRandom(['W', 'L'], [winloseProb, 1 - winloseProb]);
  const choice=outcome==='W'?weightedRandom(winData, winProb):weightedRandom(lossData, lossProb);
  return choice;
}

const calculateProb=function(total, arr){
    return arr.map((value)=>(value/total));
}

function main(){
    //const totalNoOfWins=winorloose.fetchTotal();
    const totalNoOfWins=30;
    const winloseProb=totalNoOfWins?1/3:0;
    // const data=winorloose.fetchData();
    const winData = new Map([
        ['10% off', 20],
        ['20% off', 8],
        ['30% off', 2]
      ]);
    const looseData = new Map([
        ['better luck next time', null],
        ['try again', null],
        ['retry', null]
      ]);
    const winProb=calculateProb(totalNoOfWins,[...winData.values()]);
    const lossProb=calculateProb(looseData.size,Array(looseData.size).fill(1));
    console.log(offer(winloseProb,[...winData.keys()],winProb,[...looseData.keys()],lossProb));
}
main();