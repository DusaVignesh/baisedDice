const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
function getUserInput(limit) {
    return new Promise((resolve, reject) => {
      let count = 0;
      const userMap = new Map();
      function askUser() {
        if (count < limit) {
          rl.question(`Enter attribute-availableCount: `, (input) => {
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


async function getLimit(str){
    return new Promise((resolve, reject) => {
        rl.question(str, (input) => {
            const limit=parseInt(input,10);
            resolve(limit);
        });
      });
}
async function getValue(){
    return new Promise((resolve, reject) => {
        rl.question(`Enter GameID: `, (input) => {
            resolve(input);
        });
      });
}
module.exports={getLimit,getUserInput,getValue};