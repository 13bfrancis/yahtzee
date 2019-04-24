export const stringifyDiceValues = diceObjs => {
  return diceObjs
    .map(die => {
      return die.value;
    })
    .sort()
    .join('');
};
//this should work, haven't tested it though
