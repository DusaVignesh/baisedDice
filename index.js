const {getLimit,getUserInput, getValue} = require('./inputs');
const {getAttribute}=require('./play_game');
const {generateFourDigitUUID}=require('./uuid_generater');
const Game = require('./Game');
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