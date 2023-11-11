const { getLimit, getUserInput } = require('./inputs');
const { generateFourDigitUUID } = require('./uuid_generater');
const GenerateDice = require('./GenerateDice');

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

module.exports = GenerateId;
