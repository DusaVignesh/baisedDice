const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

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

function getUserInput(limit) {
    return new Promise((resolve, reject) => {
      let count = 0;
      const userMap = new Map();
      function askUser() {
        if (count < limit) {
          rl.question(`Enter key-value pair): `, (input) => {
            const [key, value] = input.split(' ');
            userMap.set(key,Number(value));
            count++;
            askUser();
          });
        } else {
          resolve(userMap);
        }
      }
      askUser();
    });
  }


async function getLimit(){
    return new Promise((resolve, reject) => {
        rl.question(`Enter limit `, (input) => {
            const limit=parseInt(input,10);
            resolve(limit);
        });
      });
}
async function main(){
    // const data=winorloose.fetchData();
    const winAttributeLimit=await getLimit();
    const winData = await getUserInput(winAttributeLimit);
    const looseAttributeLimit=await getLimit();
    const looseData=await getUserInput(looseAttributeLimit);
    //   const winData=await getWinData();
    // const looseData = new Map([
    //     ['better luck next time', null],
    //     ['try again', null],
    //     ['retry', null]
    //   ]);
    let totalNoOfWins=[...winData.values()].reduce((acc,val)=>acc+val,0);
    const arr=[];
    for(let i=0;i<30;i++){
        const temp=getAttribute(totalNoOfWins,winData,looseData);
        arr.push(temp[1]);
        if(temp[0]==='W'){
            const currentCont=winData.get(temp[1]);
            winData.set(temp[1],currentCont?currentCont-1:0);
            totalNoOfWins--;
        }
    }
    console.log(arr);
}
main();
