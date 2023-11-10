const {getLimit,getUserInput, getValue} = require('./inputs');
const {getAttribute}=require('./play_game');
const {generateFourDigitUUID}=require('./uuid_generater');
class GenerateDice{
    constructor(winData,looseData){
        this.winData=winData;
        this.looseData=looseData;
        this.history=[];
        this.totalNoOfWins=[...this.winData.values()].reduce((acc,val)=>acc+val,0);
    }
    play(){
        const temp=getAttribute(this.totalNoOfWins,this.winData,this.looseData);
        this.history.push(temp[1]);
        if(temp[0]==='W'){
            const currentCont=this.winData.get(temp[1]);
            this.winData.set(temp[1],currentCont?currentCont-1:0);
            this.totalNoOfWins--;
            console.log(`Won: ${temp[1]}`);
        }
        else
            console.log(`Loose: ${temp[1]}`);
    }
    displayHistory(){
        return this.history;
    }
}
class GenerateId {
    constructor() {
      this.lobby = new Map();
    }
  
    async generate() {
      const winAttributeLimit = await getLimit('Enter Win Limit: ');
      const winData = await getUserInput(winAttributeLimit);
      const looseAttributeLimit = await getLimit('Enter Loose Limit: ');
      const looseData = await getUserInput(looseAttributeLimit);
  
      const uuid = generateFourDigitUUID();
      this.lobby.set(uuid, new GenerateDice(winData, looseData));
  
      return uuid;
    }
  }


class Game{
    constructor(){
        this.generateID=new GenerateId();
    }
    play(id){
        const temp=this.generateID.lobby.get(id);
        temp.play();
        return temp.displayHistory();
    }
    create(){
        return this.generateID.generate();
    }
}

async function main(){
    const diceGame=new Game();
    let a=true;
    while(a){
        const choose = await getLimit('Choose 1: Generate GameID 2: Play Game: 3.Exit: ');
        switch(choose){
            case 1:
                const generatedUUID=await diceGame.create();
                console.log(`User GameID: ${generatedUUID}`);break;
            case 2:
                const uuid=await getValue();
                const history=diceGame.play(uuid);
                console.log(`History: ${history}`);break;
            case 3:
                a=false;break;
            default:
                console.log("try again");
        }
    }
}

main();
