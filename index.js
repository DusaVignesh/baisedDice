const {getLimit,getUserInput} = require('./inputs');
const {getAttribute}=require('./play_game');

async function main(){
    // const data=winorloose.fetchData();
    const winAttributeLimit=await getLimit();
    const winData = await getUserInput(winAttributeLimit);
    const looseAttributeLimit=await getLimit();
    const looseData=await getUserInput(looseAttributeLimit);
    //   const winData=await getWinData();
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
