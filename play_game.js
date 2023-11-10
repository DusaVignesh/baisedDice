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
    const choice=outcome==='W'?['W',weightedRandom(winData, winProb)]:['L',weightedRandom(lossData, lossProb)];
    return choice;
  }
  
  const calculateProb=function(total, arr){
      return arr.map((value)=>(value/total));
  }
  
  const getAttribute=function(totalNoOfWins,winData,looseData){
      const winloseProb=totalNoOfWins?1/3:0;
      const winProb=calculateProb(totalNoOfWins,[...winData.values()]);
      const lossProb=calculateProb(looseData.size,Array(looseData.size).fill(1));
      return offer(winloseProb,[...winData.keys()],winProb,[...looseData.keys()],lossProb);
  }
module.exports={getAttribute};