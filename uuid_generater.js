const { v4: uuidv4 } = require('uuid');

function generateFourDigitUUID() {
  const standardUUID = uuidv4().substring(0, 4);
  return standardUUID;
}
module.exports={generateFourDigitUUID};